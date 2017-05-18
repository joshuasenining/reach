<?php

/**
 * @file
 * General alters.
 */

/**
 * hook_html_head_alter()
 */
function mck_uig_html_head_alter(&$head_elements) {
 
}

/**
 * hook_js_alter()
 */
function mck_uig_js_alter(&$javascript) {
  $disjs = theme_get_setting('disable_js');

  // first remove the unselected css files
  if(!empty($disjs)){
	  foreach($disjs as $key => $entry) {
	    if($entry === 0) {
	        unset($disjs[$key]);
	    }
	  }

	  // remove the css file from the output
	  foreach($javascript as $key => $cs) {
	  	if(in_array($key, $disjs) && $cs['type'] == 'file') {
	  		unset($javascript[$key]);
	  	}
	  }
  }
}

/**
 * hook_css_alter()
 */
function mck_uig_css_alter(&$css) {
  $discss = theme_get_setting('disable_css');

  if(!empty($discss)){
  	// first remove the unselected css files
	  foreach($discss as $key => $entry) {
	    if($entry === 0) {
	        unset($discss[$key]);
	    }
	  }
	
	  // remove the css file from the output
	  foreach($css as $key => $cs) {
	  	if(in_array($key, $discss) && $cs['type'] == 'file') {
	  		unset($css[$key]);
	  	}
	  }
  }
  
}

/**
 * hook_page_alter()
 */
function mck_uig_page_alter(&$page) {
  
}

/**
 * hook_form_FORM_alter()
 */
function mck_uig_form_alter(&$form, &$form_state, $form_id) {
  
  //core search form or search api page module form
  $search_icon = '<span class="mck-icon__search"></span>';
  $class = 'mck-search__input';
  $placeholder = t("Type to Search"); 
  if($form_id == 'search_block_form' || (strpos($form_id, 'search_api_page') !== false && $form_id != 'search_api_page_search_form')){
    $form['#attributes']['class'] = array('mck-search__form mck-search__form--overlay');
    
    //search api page form
    if(isset($form['keys_1'])) {
      $form['keys_1']['#prefix'] = $search_icon;
      $form['keys_1']['#attributes']['placeholder'] = $placeholder;
      $form['keys_1']['#attributes']['class'][] = $class;
    }
    
    //core form
    if(isset($form['search_block_form'])) {
      $form['search_block_form']['#prefix'] = $search_icon;
      $form['search_block_form']['#attributes']['placeholder'] = $placeholder;
      $form['search_block_form']['#attributes']['class'][] = $class;
    }
    
  }
  
  // full search page form
  if($form_id == 'search_api_page_search_form') {
    $form['#attributes']['class'] = array('mck-search__form mck-search__form--results');
    $form['form']['keys_1']['#attributes']['placeholder'] = $placeholder;
    $form['form']['keys_1']['#prefix'] = $search_icon;
    $form['form']['keys_1']['#title'] = '';
    $form['form']['keys_1']['#attributes']['class'][] = $class;
  }
  
  // alter comment form
  if(strpos($form_id, 'comment_node') !== false){
    $form['comment_body'][LANGUAGE_NONE][0]['#attributes']['class'][] = 'mck-form-comment__input';
    $form['comment_body'][LANGUAGE_NONE][0]['#attributes']['placeholder'] = t('Write a comment...');
    $form['#attributes']['class'][] = 'mck-survey mck-form-comment';
    
    $form['actions']['submit']['#value'] = t('Post comment');
    $form['submit_wrapper'] = array(
       '#markup' => '<div class="mck-form-comment__footer"><span class="mck-form-comment__character-counter bold"></span>' . render($form['actions']['submit']) . '</div>'
    ); 
    
  }
  
}

/**
 * hook_form_FORM_ID_alter()
 * Modify the Advanced Search Form
 */
function mck_uig_form_search_form_alter(&$form, $form_state) {
  
}

/**
 * hook_form_FORM_ID_alter()
 * Modify the User Login Block Form
 */
function mck_uig_form_user_login_block_alter(&$form, &$form_state, $form_id) {
  
}

/**
 * hook_form_BASE_FORM_ID_alter()
 * Modify field classes on node forms.
 */
function mck_uig_form_node_form_alter(&$form, &$form_state, $form_id) {
  
}

/**
 * Set a class on the iframe body element for WYSIWYG editors. This allows you
 * to easily override the background for the iframe body element.
 * This only works for the WYSIWYG module: http://drupal.org/project/wysiwyg
 */
function mck_uig_wysiwyg_editor_settings_alter(&$settings, &$context) {
  
}
