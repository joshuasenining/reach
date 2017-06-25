<?php
/**
 * @file
 * basic_page_content_type.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function basic_page_content_type_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function basic_page_content_type_node_info() {
  $items = array(
    'page' => array(
      'name' => t('Basic page'),
      'base' => 'node_content',
      'description' => t('Use <em>basic pages</em> for your static content, such as an \'About us\' page.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

/**
 * Implements hook_paragraphs_info().
 */
function basic_page_content_type_paragraphs_info() {
  $items = array(
    'accordion' => array(
      'name' => 'Accordion',
      'bundle' => 'accordion',
      'locked' => '1',
    ),
    'banner' => array(
      'name' => 'Banner',
      'bundle' => 'banner',
      'locked' => '1',
    ),
    'block_reference' => array(
      'name' => 'Block Reference',
      'bundle' => 'block_reference',
      'locked' => '1',
    ),
    'content_with_slider' => array(
      'name' => 'Content with Slider',
      'bundle' => 'content_with_slider',
      'locked' => '1',
    ),
    'plain_content' => array(
      'name' => 'Plain Content',
      'bundle' => 'plain_content',
      'locked' => '1',
    ),
    'slider' => array(
      'name' => 'Slider',
      'bundle' => 'slider',
      'locked' => '1',
    ),
    'two_column_content' => array(
      'name' => 'Two Column Content',
      'bundle' => 'two_column_content',
      'locked' => '1',
    ),
  );
  return $items;
}
