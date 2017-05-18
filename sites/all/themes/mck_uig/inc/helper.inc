<?php

/**
 * @file
 * All the generic function 
 */

/* generate a main menu package */
function mck_uig_helper_main_menu() {
  $menu_id = theme_get_setting('select_menu');
  $output = '<nav class="mck-nav-main mobile-nav">';
	
	if($menu_id != 0) {
    $menu_name = menu_get_names();
    $tree_data = menu_tree_all_data($menu_name[$menu_id-1]);
    $tree = menu_tree_output($tree_data);
    $output .= '<a href="#" class="mck-nav-main__toggle mck-icon__menu"></a><ul class="mck-nav-main__list">';
    foreach($tree as $element) {

      if(isset($element ['#title'])){

        $sub_menu = '';

        // all the link options
        $link_options = array();
        if(!empty($element['#localized_options'])) {
          $link_options = $element['#localized_options'];
        }

        // all the li attributes
        $attributes = array();
        if(!empty($element['#attributes'])) {
          $attributes = $element['#attributes'];
        }

        // remove class from the attributes
        if(isset($element['#attributes']['class'])) {
          //unset($element['#attributes']['class']);
        }

        // render below or children
        if ($element ['#below']) {
          if(!empty($element['#localized_options']['minipanel'])) {
            $panel_name = $element['#localized_options']['minipanel'];
            $load = panels_mini_load($panel_name);
            $sub_menu = panels_render_display($load->display);
          }
         
        }

        // build link
        $l_link = l($element ['#title'], $element['#href'], $link_options);
        $output .= '<li class="mck-nav-main__list-item mck-nav-main__group-item--padding"' . drupal_attributes($attributes) . '>' . $l_link . $sub_menu . "</li>";
      }

    }
    $output .= '</ul>';
  }
	$output .= '</nav>';
	return $output;
}


function mck_uig_helper_main_menu_desktop() {
  $menu_id = theme_get_setting('select_menu');
  $output = '<nav class="mck-nav-main desktop-nav">';
  
  if($menu_id != 0) {
    $menu_name = menu_get_names();
    $tree_data = menu_tree_all_data($menu_name[$menu_id-1]);
    $tree = menu_tree_output($tree_data);
    $output .= '<a href="#" class="mck-nav-main__toggle mck-icon__menu"></a><ul class="mck-nav-main__list">';
    foreach($tree as $element) {

      if(isset($element ['#title'])){

        $sub_menu = '';

        // all the link options
        $link_options = array();
        if(!empty($element['#localized_options'])) {
          $link_options = $element['#localized_options'];
        }

        // all the li attributes
        $attributes = array();
        if(!empty($element['#attributes'])) {
          $attributes = $element['#attributes'];
        }

        // remove class from the attributes
        if(isset($element['#attributes']['class'])) {
          //unset($element['#attributes']['class']);
        }

        // render below or children
        if ($element ['#below']) {
          // $load = panels_mini_load('create');
          // $sub_menu = panels_render_display($load->display);
          $sub_menu = drupal_render($element['#below']);
          //kpr($sub_menu);

          
        }

        // build link
        $l_link = l($element ['#title'], $element['#href'], $link_options);
        $output .= '<li class="mck-nav-main__list-item mck-nav-main__group-item--padding"' . drupal_attributes($attributes) . '>' . $l_link . $sub_menu . "</li>";
      }

    }
    $output .= '</ul>';
  }
  $output .= '</nav>';
  return $output;
}

/*
 * Pass timestamp will return time ago
 */
function mck_uig_helper_time_passed($timestamp){
    $diff = time() - (int)$timestamp;
    if ($diff == 0) 
         return 'just now';

    $intervals = array(
        1                   => array('year',    31556926),
        $diff < 31556926    => array('month',   2628000),
        $diff < 2629744     => array('week',    604800),
        $diff < 604800      => array('day',     86400),
        $diff < 86400       => array('hour',    3600),
        $diff < 3600        => array('minute',  60),
        $diff < 60          => array('second',  1)
    );

    $value = floor($diff/$intervals[1][1]);
    return $value.' '.$intervals[1][0].($value > 1 ? 's' : '').' ago';
}