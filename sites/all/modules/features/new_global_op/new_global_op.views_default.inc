<?php
/**
 * @file
 * new_global_op.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function new_global_op_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'tests';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Global Ops';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title_editable' => 'title_editable',
    'field_location_editable' => 'field_location_editable',
    'field_contact_editable' => 'field_contact_editable',
    'field_needs_requirements_editable' => 'field_needs_requirements_editable',
    'field_office_editable' => 'field_office_editable',
    'field_role_editable' => 'field_role_editable',
    'field_sector_editable' => 'field_sector_editable',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title_editable' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_location_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_contact_editable' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_needs_requirements_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_office_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_role_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_sector_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  /* Field: Content: Title (editable) */
  $handler->display->display_options['fields']['title_editable']['id'] = 'title_editable';
  $handler->display->display_options['fields']['title_editable']['table'] = 'node';
  $handler->display->display_options['fields']['title_editable']['field'] = 'title_editable';
  $handler->display->display_options['fields']['title_editable']['textfield_size'] = '';
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Content: Region (editable) */
  $handler->display->display_options['fields']['field_region_editable']['id'] = 'field_region_editable';
  $handler->display->display_options['fields']['field_region_editable']['table'] = 'field_data_field_region';
  $handler->display->display_options['fields']['field_region_editable']['field'] = 'field_region_editable';
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
    'global_ops' => 'global_ops',
  );

  /* Display: EditPage */
  $handler = $view->new_display('page', 'EditPage', 'page_1');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'editableviews_table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title_editable' => 'title_editable',
    'field_location_editable' => 'field_location_editable',
    'field_contact_editable' => 'field_contact_editable',
    'field_needs_requirements_editable' => 'field_needs_requirements_editable',
    'field_office_editable' => 'field_office_editable',
    'field_role_editable' => 'field_role_editable',
    'field_sector_editable' => 'field_sector_editable',
  );
  $handler->display->display_options['style_options']['default'] = '-1';
  $handler->display->display_options['style_options']['info'] = array(
    'title_editable' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_location_editable' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_contact_editable' => array(
      'sortable' => 0,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_needs_requirements_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_office_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_role_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_sector_editable' => array(
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['batch_size'] = '10';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title (editable) */
  $handler->display->display_options['fields']['title_editable']['id'] = 'title_editable';
  $handler->display->display_options['fields']['title_editable']['table'] = 'node';
  $handler->display->display_options['fields']['title_editable']['field'] = 'title_editable';
  $handler->display->display_options['fields']['title_editable']['textfield_size'] = '';
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Content: Region (editable) */
  $handler->display->display_options['fields']['field_region_editable']['id'] = 'field_region_editable';
  $handler->display->display_options['fields']['field_region_editable']['table'] = 'field_data_field_region';
  $handler->display->display_options['fields']['field_region_editable']['field'] = 'field_region_editable';
  $handler->display->display_options['fields']['field_region_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_region_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_region_editable']['suppress_description'] = 0;
  $handler->display->display_options['path'] = 'global-ops/edit';

  /* Display: All Locations */
  $handler = $view->new_display('page', 'All Locations', 'page_2');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'multiselect';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  $handler->display->display_options['path'] = 'global-ops';

  /* Display: Asia */
  $handler = $view->new_display('page', 'Asia', 'page_3');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'multiselect';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'global_ops' => 'global_ops',
  );
  /* Filter criterion: Content: Region (field_region) */
  $handler->display->display_options['filters']['field_region_tid']['id'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['table'] = 'field_data_field_region';
  $handler->display->display_options['filters']['field_region_tid']['field'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['value'] = array(
    67 => '67',
  );
  $handler->display->display_options['filters']['field_region_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_region_tid']['vocabulary'] = 'region';
  $handler->display->display_options['path'] = 'global-ops/asia';

  /* Display: LATAM */
  $handler = $view->new_display('page', 'LATAM', 'page_4');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'multiselect';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'global_ops' => 'global_ops',
  );
  /* Filter criterion: Content: Region (field_region) */
  $handler->display->display_options['filters']['field_region_tid']['id'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['table'] = 'field_data_field_region';
  $handler->display->display_options['filters']['field_region_tid']['field'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['value'] = array(
    233 => '233',
  );
  $handler->display->display_options['filters']['field_region_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_region_tid']['vocabulary'] = 'region';
  $handler->display->display_options['path'] = 'global-ops/latam';

  /* Display: NA */
  $handler = $view->new_display('page', 'NA', 'page_6');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'global_ops' => 'global_ops',
  );
  /* Filter criterion: Content: Region (field_region) */
  $handler->display->display_options['filters']['field_region_tid']['id'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['table'] = 'field_data_field_region';
  $handler->display->display_options['filters']['field_region_tid']['field'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['value'] = array(
    234 => '234',
  );
  $handler->display->display_options['filters']['field_region_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_region_tid']['vocabulary'] = 'region';
  $handler->display->display_options['path'] = 'global-ops/na';

  /* Display: Europe */
  $handler = $view->new_display('page', 'Europe', 'page_5');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'global_ops' => 'global_ops',
  );
  /* Filter criterion: Content: Region (field_region) */
  $handler->display->display_options['filters']['field_region_tid']['id'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['table'] = 'field_data_field_region';
  $handler->display->display_options['filters']['field_region_tid']['field'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['value'] = array(
    235 => '235',
  );
  $handler->display->display_options['filters']['field_region_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_region_tid']['vocabulary'] = 'region';
  $handler->display->display_options['path'] = 'global-ops/europe';

  /* Display: Africa */
  $handler = $view->new_display('page', 'Africa', 'page_7');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Office (editable) */
  $handler->display->display_options['fields']['field_office_editable']['id'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['table'] = 'field_data_field_office';
  $handler->display->display_options['fields']['field_office_editable']['field'] = 'field_office_editable';
  $handler->display->display_options['fields']['field_office_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_office_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_office_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_office_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_office_editable']['suppress_description'] = 0;
  /* Field: Field: Role (editable) */
  $handler->display->display_options['fields']['field_role_editable']['id'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['table'] = 'field_data_field_role';
  $handler->display->display_options['fields']['field_role_editable']['field'] = 'field_role_editable';
  $handler->display->display_options['fields']['field_role_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_role_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_role_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_role_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_role_editable']['suppress_description'] = 0;
  /* Field: Field: Sector (editable) */
  $handler->display->display_options['fields']['field_sector_editable']['id'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['table'] = 'field_data_field_sector';
  $handler->display->display_options['fields']['field_sector_editable']['field'] = 'field_sector_editable';
  $handler->display->display_options['fields']['field_sector_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_sector_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_sector_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_sector_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_sector_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements (editable) */
  $handler->display->display_options['fields']['field_needs_requirements_editable']['id'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['table'] = 'field_data_field_needs_requirements';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['field'] = 'field_needs_requirements_editable';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['widget_type'] = 'taxonomy_autocomplete';
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_needs_requirements_editable']['suppress_description'] = 0;
  /* Field: Field: Contact (editable) */
  $handler->display->display_options['fields']['field_contact_editable']['id'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['table'] = 'field_data_field_contact';
  $handler->display->display_options['fields']['field_contact_editable']['field'] = 'field_contact_editable';
  $handler->display->display_options['fields']['field_contact_editable']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_contact_editable']['alter']['text'] = '<a href="[field_contact_editable-url]" target="_blank"><span class="mck-icon__email"></span>[field_contact_editable-title]</a>';
  $handler->display->display_options['fields']['field_contact_editable']['click_sort_column'] = 'url';
  $handler->display->display_options['fields']['field_contact_editable']['widget_type'] = '0';
  $handler->display->display_options['fields']['field_contact_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_contact_editable']['suppress_description'] = 0;
  /* Field: Content: Location (editable) */
  $handler->display->display_options['fields']['field_location_editable']['id'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['table'] = 'field_data_field_location';
  $handler->display->display_options['fields']['field_location_editable']['field'] = 'field_location_editable';
  $handler->display->display_options['fields']['field_location_editable']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_location_editable']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_location_editable']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_location_editable']['widget_type'] = 'options_select';
  $handler->display->display_options['fields']['field_location_editable']['suppress_label'] = 0;
  $handler->display->display_options['fields']['field_location_editable']['suppress_description'] = 0;
  /* Field: Field: Needs/Requirements Exert */
  $handler->display->display_options['fields']['field_needs_requirements_exert']['id'] = 'field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['table'] = 'field_data_field_needs_requirements_exert';
  $handler->display->display_options['fields']['field_needs_requirements_exert']['field'] = 'field_needs_requirements_exert';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'global_ops' => 'global_ops',
  );
  /* Filter criterion: Content: Region (field_region) */
  $handler->display->display_options['filters']['field_region_tid']['id'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['table'] = 'field_data_field_region';
  $handler->display->display_options['filters']['field_region_tid']['field'] = 'field_region_tid';
  $handler->display->display_options['filters']['field_region_tid']['value'] = array(
    535 => '535',
  );
  $handler->display->display_options['filters']['field_region_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_region_tid']['vocabulary'] = 'region';
  $handler->display->display_options['path'] = 'global-ops/africa';
  $export['tests'] = $view;

  return $export;
}
