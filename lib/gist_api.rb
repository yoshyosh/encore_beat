module GistApi
  def self.create!(contents)
    return false if contents.blank?

    conn = Faraday.new(:url => 'https://api.github.com') do |faraday|
      faraday.request  :url_encoded
      faraday.adapter  Faraday.default_adapter
    end

    query_as_hash = { 
      :"description" => "EB admin-generated gist",
      :"public" => false,
      :"files" => {
        :"eb-#{Time.now}.md" => {
          :"content" => contents
        }
      }
    }

    response = conn.post '/gists', query_as_hash.to_json do |req|
      req.options[:timeout] = 20
      req.options[:open_timeout] = 20
    end

    if response.status == 400
      false
    else
      JSON.parse(response.body)["html_url"]
    end
  end
end
