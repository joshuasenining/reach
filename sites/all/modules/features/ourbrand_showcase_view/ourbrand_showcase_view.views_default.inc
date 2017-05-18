<?php
/**
 * @file
 * ourbrand_showcase_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function ourbrand_showcase_view_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'showcase';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'showcase';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'showcase';
  $handler->display->display_options['css_class'] = 'showcase_print';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['pure_distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Showcase Description */
  $handler->display->display_options['fields']['field_showcase_description']['id'] = 'field_showcase_description';
  $handler->display->display_options['fields']['field_showcase_description']['table'] = 'field_data_field_showcase_description';
  $handler->display->display_options['fields']['field_showcase_description']['field'] = 'field_showcase_description';
  $handler->display->display_options['fields']['field_showcase_description']['label'] = '';
  $handler->display->display_options['fields']['field_showcase_description']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_showcase_description']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_showcase_description']['alter']['text'] = '<div class="mck-content-module__info">
<ul class="mck-content-module__metadata mck-list--tiny">
        <li class="mck-th-color-black">Print</li>
        <li>Brochure</li>
      </ul>
<h5 class="mck-content-module__title">[title]</h5>
<div class="mck-content-module__description">[field_showcase_description]</div>
</div>';
  $handler->display->display_options['fields']['field_showcase_description']['element_type'] = '0';
  $handler->display->display_options['fields']['field_showcase_description']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_showcase_description']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_showcase_description']['element_wrapper_type'] = '0';
  /* Field: Content: Showcase Designer */
  $handler->display->display_options['fields']['field_showcase_designer']['id'] = 'field_showcase_designer';
  $handler->display->display_options['fields']['field_showcase_designer']['table'] = 'field_data_field_showcase_designer';
  $handler->display->display_options['fields']['field_showcase_designer']['field'] = 'field_showcase_designer';
  $handler->display->display_options['fields']['field_showcase_designer']['exclude'] = TRUE;
  /* Field: Content: Showcase Images Slideshow Images */
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['id'] = 'field_showcase_images_slideshow';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['table'] = 'field_data_field_showcase_images_slideshow';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['field'] = 'field_showcase_images_slideshow';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['label'] = '';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['alter']['text'] = '<div class="mck-content-module__image">
[field_showcase_images_slideshow]
</div>
';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['alter']['path'] = 'node/1';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['element_type'] = '0';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['element_label_type'] = '0';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_showcase_images_slideshow']['separator'] = '';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<a href="#">
[field_showcase_images_slideshow]
[field_showcase_description]
</a>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
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
    'showcase_items' => 'showcase_items',
  );

  /* Display: Print */
  $handler = $view->new_display('block', 'Print', 'block');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'showcase_print';

  /* Display: Video */
  $handler = $view->new_display('block', 'Video', 'block_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'showcase_video';

  /* Display: Website */
  $handler = $view->new_display('block', 'Website', 'block_2');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'showcase_website';
  $export['showcase'] = $view;

  return $export;
}
