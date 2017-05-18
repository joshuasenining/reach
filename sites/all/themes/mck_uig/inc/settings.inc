<?php
/**
 * @file
 * Implimentation of hook_form_system_theme_settings_alter()
 */
function mck_uig_form_system_theme_settings_alter(&$form, &$form_state, $form_id = NULL) {

  // core settings
  $form['uig_settings'] = array(
    '#type' => 'vertical_tabs',
    '#description' => t('Core'),
    '#weight' => -10
  );
  $form['uig_settings']['core'] = array(
    '#type' => 'fieldset',
    '#title' => t('Core'),
    '#weight' => 100
  );
  
  $form['uig_settings']['core']['all_settings'] = $form['theme_settings'];
  unset($form['theme_settings']);
  


  // basic settings
  $form['uig_settings']['basic_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Basic Settings'),
  );
  
  // get menu list with none as first item
  $menu_options = menu_get_names();
  array_unshift($menu_options, '-- None --');
  $form['uig_settings']['basic_settings']['select_menu'] = array(
    '#type' => 'select',
    '#title' => t('Select main menu'),
    '#description'=> t('Select which menu should be appear on top.'),
    '#options' => $menu_options,
    '#default_value' => theme_get_setting('select_menu'),
  );
  
  $color_options = array(
      'white', 'black', 'blue-bright', 
      'blue-grey', 'blue-grey', 'blue-mckinsey', 
      'cyan', 'grey-dark', 'grey-light', 
      'purple', 'red', 'turquoise', 
      'turquoise-dark', 'yellow'
   );
  $color_options_select = theme_get_setting('color_theme');
  $form['uig_settings']['basic_settings']['color_theme'] = array(
    '#type' => 'select',
    '#title' => t('Select site color theme'),
    '#description'=> t('Select site color theme(from UIG), this theme will also impact UIG provided components eg: buttons, hover effect etc.'),
    '#options' => array_combine($color_options, $color_options), // make key and value same
    '#default_value' => isset($color_options_select) ? $color_options_select : 0,
  );
  
  
  $form['uig_settings']['basic_settings']['show_breadcrumb'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Breadcrumb'),
    '#description'=> t('Show/Hide breadcrumb'),
    '#default_value' => theme_get_setting('show_breadcrumb'),
  );
  $form['uig_settings']['basic_settings']['show_footer_feedback'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Footer Feedback'),
    '#description'=> t('Show/Hide footer feedback.'),
    '#default_value' => theme_get_setting('show_footer_feedback'),
  );
  $form['uig_settings']['basic_settings']['show_launcher'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show App Launcher'),
    '#description'=> t('Show/Hide app launcher on header'),
    '#default_value' => theme_get_setting('show_launcher'),
  );
  $form['uig_settings']['basic_settings']['show_profile'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Profile'),
    '#description'=> t('Show/Hide profile on header'),
    '#default_value' => theme_get_setting('show_profile'),
  );
  $form['uig_settings']['basic_settings']['show_search'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show Search'),
    '#description'=> t('Show/Hide search on header'),
    '#default_value' => theme_get_setting('show_search'),
  );
  $form['uig_settings']['basic_settings']['disable_header_logo_linked'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable header logo linked'),
    '#description'=> t('Enable/Disable logo to be clickable'),
    '#default_value' => theme_get_setting('disable_header_logo_linked'),
  );
  $form['uig_settings']['basic_settings']['disable_site_name_linked'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable site name linked'),
    '#description'=> t('Enable/Disable site name to be clickable.'),
    '#default_value' => theme_get_setting('disable_site_name_linked'),
  );
  $form['uig_settings']['basic_settings']['disable_footer_logo_linked'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable footer logo linked'),
    '#description'=> t('Enable/Disable footer logo to be clickable.'),
    '#default_value' => theme_get_setting('disable_footer_logo_linked'),
  );
  $form['uig_settings']['basic_settings']['add_back_to_top'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show back to top'),
    '#description'=> t('Back to top will only display if user scroll towards down.'),
    '#default_value' => theme_get_setting('add_back_to_top'),
  );
  $form['uig_settings']['basic_settings']['add_back_to_top_offset'] = array(
    '#type' => 'textfield',
    '#maxlength'=> 255,
    '#size'=> 30,
    '#title' => t('Show back to top offset from top'),
    '#description'=> t('Show back to top - offset eg: 400, 500. Leave empty for default:0'),
    '#default_value' => theme_get_setting('add_back_to_top_offset'),
    '#states' => array(
        'visible' => array(
            ':input[name="add_back_to_top"]' => array('checked' => TRUE),
        )
      )
  );

  // css/js 
  $css_files = drupal_add_css();
  $css_array = array();
  foreach($css_files as $key => $file){
    if($file['type'] == 'file') {
      $css_array[$key] = $key;
    }
  }
  $js_files = drupal_add_js();
  $js_array = array();
  foreach($js_files as $key => $file){
    if($file['type'] == 'file') {
      $js_array[$key] = $key;
    }
  }
  $form['uig_settings']['css_js'] = array(
    '#type' => 'fieldset',
    '#title' => t('Disable CSS OR JS'),
  );
  $form['uig_settings']['css_js']['disable_css'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Disable CSS'),
      '#description'=> t('Select CSS file which you want to disable.'),
      '#default_value' => theme_get_setting('disable_css'),
      '#options' => $css_array,
  );
  $form['uig_settings']['css_js']['disable_js'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Disable JS'),
      '#description'=> t('Select JS file which you want to disable.'),
      '#default_value' => theme_get_setting('disable_js'),
      '#options' => $js_array,
  );
  
}
