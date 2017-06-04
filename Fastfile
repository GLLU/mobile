# More documentation about how to customize your build
# can be found here:
# https://docs.fastlane.tools
fastlane_version "1.109.0"

# This value helps us track success metrics for Fastfiles
# we automatically generate. Feel free to remove this line
# once you get things running smoothly!
generated_fastfile_id "32c93b64-d33c-419f-972c-b80bc91fdccd"

default_platform :ios

# Fastfile actions accept additional configuration, but
# don't worry, fastlane will prompt you for required
# info which you can add here later
lane :beta do
  # build your iOS app
  gym(
    # scheme: "YourScheme",
    export_method: "ad-hoc"
  )

  # upload to Beta by Crashlytics
  crashlytics(
    api_token: "073fbe796531c6ef71a3c78ed34e237691bf78bf",
    build_secret: "5ba957e3155c3e2486b6761741131b6891d868551cdeb44bcce84ce3a42f2624"
  )
end
