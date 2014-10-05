module GistApi
  def self.create!(contents)
    return false if contents.blank?

    conn = Faraday.new(:url => 'https://api.github.com') do |faraday|
      faraday.request  :url_encoded
      faraday.adapter  Faraday.default_adapter
    end

    json_query = { 
      :"description" => "EB admin-generated gist",
      :"public" => false,
      :"files" => {
        :"eb-#{Time.now}.md" => {
          :"content" => contents
        }
      }
    }.to_json

    response = conn.post '/gists', json_query do |req|
      req.options[:timeout] = 20
      req.options[:open_timeout] = 20
    end

    JSON.parse(response.body) && JSON.parse(response.body)["html_url"]
  end
end
