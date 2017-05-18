<?php
/**
 * @file
 * new_global_op.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function new_global_op_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function new_global_op_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function new_global_op_node_info() {
  $items = array(
    'global_ops' => array(
      'name' => t('Global Ops'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
