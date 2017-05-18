<?php

function ourbrand_uig_preprocess_node(&$vars) { 
/* 
 * Build the menu for subpage content type 
 * Output in node-subpage.tpl.php
 * --Rajiv
*/  
$active_trail = menu_get_active_trail();
end($active_trail);
$parent = prev($active_trail);

// kpr($parent);


$parameters = array(
  'active_trail' => array($parent['plid']),
  'only_active_trail' => FALSE,
  'min_depth' => $parent['depth']+1,
  'max_depth' => $parent['depth']+1,
  'conditions' => array('plid' => $parent['mlid']),
);

$children = menu_build_tree($parent['menu_name'], $parameters);
$vars['subpage_menu'] = '<div class="sub-menu-inner">' . drupal_render(menu_tree_output($children)) . '</div>';
$vars['section_title'] = $parent['link_title'];

// Get a list of all the regions for this theme
  foreach (system_region_list($GLOBALS['theme']) as $region_key => $region_name) {

    // Get the content for each region and add it to the $region variable
    if ($blocks = block_get_blocks_by_region($region_key)) {
      $vars['region'][$region_key] = $blocks;
    }
    else {
      $vars['region'][$region_key] = array();
    }
  }

}
function ourbrand_uig_preprocess_page(&$vars) {


// Do we have a node?
  if (isset($vars['node'])) {

    // Ref suggestions cuz it's stupid long.
    $suggests = &$vars['theme_hook_suggestions'];
    // print_r($suggests);

    // Get path arguments.
    $args = arg();
    // Remove first argument of "node".
    unset($args[0]);

    // Set type.
    $type = "page__type_{$vars['node']->type}";

    // Bring it all together.
    $suggests = array_merge(
      $suggests,
      array($type),
      theme_get_suggestions($args, $type)
    );

    // Set node.
    $t_tile = strtolower($vars['node']->title);
    $node_name = "page__{$t_tile}";

    // Bring it all together (again).
    $suggests = array_merge(
      $suggests,
      array($node_name),
      theme_get_suggestions($args, $node_name)
    );


    //print_r($suggests);
}

$search = drupal_render(drupal_get_form('search_block_form'));
$vars['search_form'] = $search;
  

}



function ourbrand_uig_preprocess_image(&$variables) {
  foreach (array('width', 'height') as $key) {
    unset($variables[$key]);
  }
}


function ourbrand_uig_preprocess_block(&$vars) {
  // kpr($vars);

$block_machine_name = $vars['elements']['#block']->delta;

if($block_machine_name == "footer_info") {
  $vars['classes_array'][] = "mck-footer__copy";
}

}

function ourbrand_uig_form_alter(&$form, &$form_state, $form_id) {
  if($form_id == "views_exposed_form"){
    $form['keys']['#attributes']['placeholder'] = "Search";    
  }
}