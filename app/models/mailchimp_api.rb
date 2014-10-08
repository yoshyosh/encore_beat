module MailchimpApi
  WEEKLY_NEWSLETTER_ID = '26876761da'
  def self.subscribe_user!(email, username = nil)
    return { success: true } unless Rails.env.production?

    begin
      client.lists.subscribe(WEEKLY_NEWSLETTER_ID, { email: email }, { username: username }, 'html', false)
    rescue Mailchimp::ListAlreadySubscribedError
      warn = "#{email} is already subscribed!"
    rescue Mailchimp::ListDoesNotExistError
      error = "The list could not be found"
    rescue Mailchimp::Error => ex
      if ex.message
        error = ex.message
      else
        error = "Sorry, an unknown error occurred. Please try again."
      end
    end

    success = true unless error || warn

    { email: email, success: success, error: error, warn: warn }
  end

  def self.client
    Mailchimp::API.new(ENV['MAILCHIMP_API_KEY'])
  end
end
