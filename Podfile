require_relative '../node_modules/react-native/scripts/react_native_pods'

platform :ios, min_ios_version_supported
prepare_react_native_project!

project 'fitnessapp.xcodeproj'

target 'fitnessapp' do
  config = use_native_modules!
  use_react_native!(
    :path => '../node_modules/react-native',
    :hermes_enabled => true
  )

  pod 'react-native-maps', :path => '../node_modules/react-native-maps'

  target 'fitnessappTests' do
    inherit! :complete
    # Pods for testing
  end

  post_install do |installer|
    react_native_post_install(
      installer,
      '../node_modules/react-native',
      :mac_catalyst_enabled => false
    )
  end
end 