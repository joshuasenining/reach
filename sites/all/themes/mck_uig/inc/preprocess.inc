<?php

/**
 * @file
 * All Preprocess functions for templates and theme fucntions.
 * If you need to add or modify preprocess functions do it in your sub-theme.
 */

/**
 * Preprocess variables for all templates.
 */
function mck_uig_preprocess(&$vars) {
}

/**
 * Preprocess variables for html.tpl.php
 */
function mck_uig_preprocess_html(&$vars) {
	$vars['classes_array'][] = 'mck-has-header'; 
  $uig_theme  = theme_get_setting('color_theme');
  $vars['uig_theme'] = $uig_theme;
}

/**
 * Preprocess variables for page.tpl.php
 */
function mck_uig_preprocess_page(&$vars) {
	global $user;
	$page = $vars['page'];
  $uig_theme  = theme_get_setting('color_theme');

  // get main menu
  $vars['main_menu'] = mck_uig_helper_main_menu();
	$vars['main_menu_desktop'] = mck_uig_helper_main_menu_desktop();

  // classe for header
  $vars['theme_class'] = "mck-th-bg-" . $uig_theme;
  
	// css classes for the columns
	//$vars['wrapper_class'] = 'mck-content mck-wrap';
	//$vars['wrapper_class'] = 'mck-content mck-wrap';
  $vars['wrapper_class'] = 'wrapper';
	$vars['inwrapper'] = 'mck-grid';
	$vars['center_class'] = 'center-content';
	if($page['sidebar_first'] || $page['sidebar_second']){
		$vars['center_class'] = 'col-wide';
		//$vars['inwrapper'] = 'mck-grid';
	}
	// when left bar only
	if($page['sidebar_first'] && !$page['sidebar_second']){
		$vars['center_class'] .= ' col--end';
	}
  
  // when no left and right column
	if(!$page['sidebar_first'] && !$page['sidebar_second']){
		$vars['wrapper_class'] .= ' single--col';
	}

	// local task
	// Build variables for Primary and Secondary local tasks
	$vars['primary_local_tasks'] = menu_primary_local_tasks();
  	$vars['secondary_local_tasks'] = menu_secondary_local_tasks();
  	$vars['action_links']      = menu_local_actions();
  	$vars['tabs']              = menu_local_tabs();

  	// breadcrumb
  	$vars['show_breadcrumb']  = theme_get_setting('show_breadcrumb');
  	$vars['show_footer_feedback']  = theme_get_setting('show_footer_feedback');
  	$vars['show_launcher']  = theme_get_setting('show_launcher');
  	$vars['show_profile']  = theme_get_setting('show_profile');
    $show_search_check  = theme_get_setting('show_search');
    
  	// check if have user access to search
    $vars['show_search'] = false;
    if($show_search_check && (user_access('search content') || user_access('access search_api_page'))) {
      $vars['show_search'] = true;
    }

  	// header logo and site name linked
  	$logo_linked  = theme_get_setting('disable_header_logo_linked');
  	$site_name_linked  = theme_get_setting('disable_site_name_linked');
  	$sitename = variable_get('site_name', '');
  	$vars['header_logo'] = l('McKinsey & Company', '<front>', array('attributes' => array('class' => array('mck-header__logo'))));
  	if($logo_linked) {
  		$vars['header_logo'] = "<div class='mck-header__logo'>McKinsey & Company</div>";
  	}
  	$vars['sitename'] = l($sitename, '<front>', array('attributes' => array('class' => array('mck-header__portal-title'))));
  	if($site_name_linked) {
  		$vars['sitename'] = "<div class='mck-header__portal-title'>" . $sitename . "</div>";
  	}

  	// footer logo
  	$footer_logo_linked  = theme_get_setting('disable_footer_logo_linked');
  	$vars['footer_logo'] = l('McKinsey & Company', '<front>', array('attributes' => array('class' => array('mck-footer__logo'))));
  	if($logo_linked) {
  		$vars['footer_logo'] = "<div class='mck-footer__logo'>McKinsey & Company</div>";
  	}

  	//user picture
    $vars['user_picture'] = '';
  	if($user->uid > 0 && $vars['show_profile'] && isset($user->picture->uri)) {
      if(isset($user->picture->uri)) {
        $vars['user_picture'] = image_style_url('user_profile_small', $user->picture->uri); 
      }
  	}

    //back to top
    $backto_top = theme_get_setting('add_back_to_top');
    $add_back_to_top_offset = theme_get_setting('add_back_to_top_offset');
    $vars['backto_top'] = '';
    if($backto_top) {
      $add_offset = 0;
      if($add_back_to_top_offset) {
        $add_offset = $add_back_to_top_offset;
      }
      drupal_add_js(array('mck_uig' => array('backto_top_offset' => $add_offset)), 'setting');
      $vars['backto_top'] = "<div class='back-to-top'><a href='#' class='mck-icon__arrow-up back-to-top'></a></div>";
    }
}

/**
 * Preprocess variables for region.tpl.php
 */
function mck_uig_preprocess_region(&$vars) {
 
}

/**
 * Preprocess variables for block.tpl.php
 */
function mck_uig_preprocess_block(&$vars) {
  $module_name = $vars['block']->module;
}

/**
 * Preprocess variables for field.tpl.php
 */
function mck_uig_preprocess_field(&$vars) {
  
}

/**
 * Preprocess variables for node.tpl.php
 */
function mck_uig_preprocess_node(&$vars) {
  $vars['classes'][] = 'mck-article';
  $vars['title_attributes'][] = 'mck-article';
}

/**
 * Preprocess variables for comment.tpl.php
 */
function mck_uig_preprocess_comment(&$vars) {
  $comment = $vars['elements']['#comment'];
  $vars['changed'] = mck_uig_helper_time_passed($comment->changed);
  $vars['designation'] = ''; // set this variable in sub theme
  $vars['location'] = ''; // set this variable in sub theme
  $vars['image'] = ''; // set this variable in sub theme
  $vars['media'] = ''; // set this variable in sub theme
  $vars['media_details'] = ''; // set this variable in sub theme
  $vars['file'] = ''; // set this variable in sub theme
  
  $vars['comment_content'] = ''; 
  if(isset($comment->comment_body['und'][0]['safe_value'])) {
    $vars['comment_content'] = $comment->comment_body['und'][0]['safe_value'];
  }
  
  // subject
  if(isset($comment->subject)) {
    $vars['subject'] = $comment->subject;
  }
  
  //user url link
  $user_url = '#';
  if(user_access('access user profiles')) {
    if($comment->uid != 0) {
      $user_url = url('user/' . $comment->uid);
    }
  }
  $vars['user_url'] = $user_url;
  
  // author name
  $vars['author'] = $comment->name;
  
}


/**
 * Preprocess variables for the search block form.
 */
function mck_uig_preprocess_search_block_form(&$vars) {
  
}

/**
 * Preprocess variables for aggregator-item.tpl.php
 */
function mck_uig_preprocess_aggregator_item(&$vars) {
  
}

/**
 * Preprocess variables for adaptivtheme_menubar()
 */
function mck_uig_preprocess_menubar(&$vars) {
  
}

/**
 * Preprocess variables for the username.
 */
function mck_uig_preprocess_username(&$vars) {
  
}

/**
 * Preprocess variables for theme_image()
 */
function mck_uig_preprocess_image(&$vars) {

}

/**
 * Preprocess variables for maintenance-page.tpl.php
 */
function mck_uig_preprocess_maintenance_page(&$vars) {
  global $base_url;
  $basepath = $base_url . '/' . drupal_get_path('theme', 'mck_uig');
  // add css 
  drupal_add_css(drupal_get_path('theme', 'mck_uig') . '/css/maintenance-page.css');
  $vars['style'] = drupal_get_css();


  $vars['logo'] = $basepath . '/logo.png'; 
  $vars['icon_maintenance'] = $basepath . '/images/maintenance/icon_maintenance.png'; 
  
}

/**
 * Preprocess variables for user-profile.tpl.php
 */
function mck_uig_preprocess_user_profile(&$vars) {
  
}

/**
 * Preprocess variables for breadcrumbs
 */
function mck_uig_preprocess_breadcrumb(&$vars) {

}


/**
 * Preprocess variables for search api pages results page
 */
function mck_uig_preprocess_search_api_page_results(array &$variables) {
  
}


/**
 * Preprocess variables for search api pages results page
 * More UI related html can be found here http://githuben.intranet.mckinsey.com/pages/DoF/dls/uig/search-results/#
 */
function mck_uig_preprocess_search_api_page_result(&$variables) {
  $index = $variables['index'];
  $item = $variables['item'];
  $url = $index->datasource()->getItemUrl($item);
  $variables['url'] = url($url['path']);
  $variables['meta'] = '';
  $variables['more'] = '';
}
