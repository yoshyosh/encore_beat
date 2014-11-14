desc "This task is called by the Heroku scheduler add-on"
task :create_top_ten => :environment do
  if Time.now.friday?
    Highlight.create(date: Date.today.to_date)
  end
end