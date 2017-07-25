<?php
/**
 * @file
 * get_inspired_page.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function get_inspired_page_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-get_inspired-field_node_residence'
  $field_instances['node-get_inspired-field_node_residence'] = array(
    'bundle' => 'get_inspired',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 3,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_node_residence',
    'label' => 'Node Residence',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => 1,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Node Residence');

  return $field_instances;
}
