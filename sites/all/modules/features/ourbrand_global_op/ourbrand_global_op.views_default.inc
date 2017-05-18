<?php
/**
 * @file
 * ourbrand_global_op.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function ourbrand_global_op_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'global_op';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Global Op';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Global Op';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'field_needs_requirements_exert' => 'field_needs_requirements_exert',
    'field_role_exert' => 'field_role_exert',
    'field_office' => 'field_office',
    'field_role' => 'field_role',
    'field_sector' => 'field_sector',
    'field_needs_requirements' => 'field_needs_requirements',
    'field_contact' => 'field_contact',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'field_needs_requirements_exert' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_role_exert' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_office' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_role' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_sector' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_needs_requirements' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_contact' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Relationship: Content: Row (field_row) */
  $handler->display->display_options['relationships']['field_row_value']['id'] = 'field_row_value';
  $handler->display->display_options['relationships']['field_row_value']['table'] = 'field_data_field_row';
  $handler->display->display_options['relationships']['field_row_value']['field'] = 'field_row_value';
  $handler->display->display_options['relationships']['field_row_value']['delta'] = '-1';
  /* Relationship: Content: Taxonomy terms on node */
  $handler->display->display_options['relationships']['term_node_tid']['id'] = 'term_node_tid';
  $handler->display->display_options['relationships']['term_node_tid']['table'] = 'node';
  $handler->display->display_options['relationships']['term_node_tid']['field'] = 'term_node_tid';
  $handler->display->display_options['relationships']['term_node_tid']['vocabularies'] = array(
    'needs_requriements' => 'needs_requriements',
    'roles' => 'roles',
    'sector' => 'sector',
    'area' => 0,
    'complex' => 0,
    'job_title' => 0,
    'location' => 0,
    'region' => 0,
    'tags' => 0,
  );
  /* Field: Field collection item: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['relationship'] = 'field_row_value';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['type'] = 'text_plain';
  /* Field: Field collection item: Role Exert */
  $handler->display->display_options['fields']['field_role_exert']['id'] = 'field_role_exert';
  $handler->display->display_options['fields']['field_role_exert']['table'] = 'field_data_field_role_exert';
  $handler->display->display_options['fields']['field_role_exert']['field'] = 'field_role_exert';
  $handler->display->display_options['fields']['field_role_exert']['relationship'] = 'field_row_value';
  /* Field: Field collection item: Office */
  $handler->display->display_options['fields']['field_office']['id'] = 'field_office';
  $handler->display->display_options['fields']['field_office']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office']['field'] = 'field_office';
  $handler->display->display_options['fields']['field_office']['relationship'] = 'field_row_value';
  /* Field: Field collection item: Role */
  $handler->display->display_options['fields']['field_role']['id'] = 'field_role';
  $handler->display->display_options['fields']['field_role']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role']['field'] = 'field_role';
  $handler->display->display_options['fields']['field_role']['relationship'] = 'field_row_value';
  $handler->display->display_options['fields']['field_role']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_role']['alter']['text'] = '<div>
[field_role]
<div class="mck-table__desc">
[field_role_exert]
</div>
</div>';
  $handler->display->display_options['fields']['field_role']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role']['delta_offset'] = '0';
  /* Field: Field collection item: Sector */
  $handler->display->display_options['fields']['field_sector']['id'] = 'field_sector';
  $handler->display->display_options['fields']['field_sector']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector']['field'] = 'field_sector';
  $handler->display->display_options['fields']['field_sector']['relationship'] = 'field_row_value';
  $handler->display->display_options['fields']['field_sector']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector']['delta_offset'] = '0';
  /* Field: Field collection item: Needs/Requirements */
  $handler->display->display_options['fields']['field_needs_requirements']['id'] = 'field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements']['field'] = 'field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements']['relationship'] = 'field_row_value';
  $handler->display->display_options['fields']['field_needs_requirements']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements']['delta_offset'] = '0';
  /* Field: Field collection item: Contact */
  $handler->display->display_options['fields']['field_contact']['id'] = 'field_contact';
  $handler->display->display_options['fields']['field_contact']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact']['field'] = 'field_contact';
  $handler->display->display_options['fields']['field_contact']['relationship'] = 'field_row_value';
  $handler->display->display_options['fields']['field_contact']['click_sort_column'] = 'url';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'global_op' => 'global_op',
  );
  /* Filter criterion: Field collection item: Office (field_office) */
  $handler->display->display_options['filters']['field_office_value']['id'] = 'field_office_value';
  $handler->display->display_options['filters']['field_office_value']['table'] = 'field_data_field_office';
  $handler->display->display_options['filters']['field_office_value']['field'] = 'field_office_value';
  $handler->display->display_options['filters']['field_office_value']['relationship'] = 'field_row_value';
  $handler->display->display_options['filters']['field_office_value']['value'] = array(
    'boston' => 'boston',
    'newyork' => 'newyork',
    'stamford' => 'stamford',
    'vancouver' => 'vancouver',
    'montreal' => 'montreal',
  );

  /* Display: all */
  $handler = $view->new_display('page', 'all', 'page');
  $handler->display->display_options['path'] = 'global-op';

  /* Display: asia */
  $handler = $view->new_display('page', 'asia', 'page_1');
  $handler->display->display_options['path'] = 'global-op/asia';

  /* Display: latam */
  $handler = $view->new_display('page', 'latam', 'page_2');
  $handler->display->display_options['path'] = 'global-op/latam';

  /* Display: north america */
  $handler = $view->new_display('page', 'north america', 'page_3');
  $handler->display->display_options['path'] = 'global-op/na';
  $export['global_op'] = $view;

  return $export;
}
