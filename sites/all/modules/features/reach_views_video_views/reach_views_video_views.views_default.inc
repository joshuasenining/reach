<?php
/**
 * @file
 * reach_views_video_views.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function reach_views_video_views_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'journeystories';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'journeystories';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Thoughts on Reach and Relevance';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '      
       <div class="section filters white">
        <div class="container">
          <div class="row">
            <div class="col s12">

            <!--   <ul class="tabs">
                <li><span>What others are doing / </span> </li>
                <li class="tab"><a class="active" href="#stories-section">Get Inspired stories</a></li>
                <li class="tab"><a href="#compendiums-section">Compendiums of 200+ examples</a></li>
                <li class="tab"><a href="#journey-section">Journey stories</a></li>
              </ul>
              -->
                <div id="filters" class="button-group linktabs">
           
                            <ul>
                                <li><span>What is R&R and why does it matter? / </span> </li>
                                <li>
                                  <span>
                             
                                      <a href="whatisrr.html" class="active">What is R&R?</a>
                                  </span>
                                </li>

                                <li>
                                      <span>
                                          <a href="whyitmatters.html">Why does R&R matter?</a>
                                       
                                        </span>
                       
                                </li>
                               
                          </ul>

              </div>
             
              <hr>
               <div class="col s12 m12 12">
                  <div class="card-panel">
                     <h2 class="section-title"> What is R&R?</h2>
                      <div class="row">

                        <div class="col s12 m3 l3 xl2">
                          <img src="images/personplaceholder.png" alt="" class="circle responsive-img"> 
                          
                                <div class="name">Peter Dahlstrom</div>
                                <div class="jobtitle">Senior Partner, Client and Firm Communications</div>
                        </div>
                        <div class="col s12 m9 l9 xl10">
                          <p>
                          Reach and Relevance is critically important to our mission of delivering lasting client impact. Through greater  “reach,” we connect with an ever expanding network of clients, potential clients, and other influencers. Through greater “relevance,” we bring value to that network by sharing distinctive knowledge and insights into their business, economic and societal context.
                          </p>
                          <p>
                          Leverage this website to build a case for R&R, identify your support network, browse through inspirational examples of R&R from others at the firm, find tools and resources, and get guidance on how to design and implement a Reach and Relevance journey.
                         </p>
                          <b>A few things to keep in mind as you get started:</b>
                          <p><span class="blue-text">Partners will prioritize R&R differently</span>. For some people R&R is a big priority. For some, it’s an enabler of other priorities. While others still are just getting started in their R&R journey. Not everyone has to have the same goals or path.
                          </p>
                          <p>
                          <span class="blue-text">A successful R&R strategy doesn\'t happen overnight</span>. As you get started, you might aspire to creating a strong foundation – getting to a baseline level of R&R. Remember, it’s the small persistent steps that will take you where you want to go. Setting achievable goals along the way will help build necessary momentum to make lasting impact.<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is: </span> Following a strategic approach in developing and achieving a vision, leveraging a mix of channels over time, and evaluating and adjusting performance over time<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is not:</span> Non-strategic, ad hoc external reputation-building activities
                        </p>


                        
                        </div>
                      </div>
                    </div>
                 </div><!--s12-->
            </div>
          
          </div><!-- row-->
        
        </div><!-- container-->
      </div><!-- section-->';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_leadership_or_expertise']['id'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['field'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['label'] = '';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_leadership_or_expertise']['element_label_colon'] = FALSE;
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
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['id'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['field'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['value'] = array(
    37 => '37',
  );

  /* Display: Journey Stories */
  $handler = $view->new_display('page', 'Journey Stories', 'page');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['path'] = 'journey-stories';

  /* Display: Journey Highlights */
  $handler = $view->new_display('block', 'Journey Highlights', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Journey Highlights';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'h6';
  $handler->display->display_options['fields']['title']['element_class'] = 'name';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content: Section */
  $handler->display->display_options['fields']['field_lead_or_exp']['id'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['field'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['label'] = '';
  $handler->display->display_options['fields']['field_lead_or_exp']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nid']['link_to_node'] = TRUE;
  /* Field: Content: Sidebar Link */
  $handler->display->display_options['fields']['field_sidebar_link']['id'] = 'field_sidebar_link';
  $handler->display->display_options['fields']['field_sidebar_link']['table'] = 'field_data_field_sidebar_link';
  $handler->display->display_options['fields']['field_sidebar_link']['field'] = 'field_sidebar_link';
  $handler->display->display_options['fields']['field_sidebar_link']['label'] = '';
  $handler->display->display_options['fields']['field_sidebar_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    35 => '35',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';
  $handler->display->display_options['block_description'] = 'Highlights from Senior Partners';

  /* Display: Other Journey Stories from Senior Partners */
  $handler = $view->new_display('block', 'Other Journey Stories from Senior Partners', 'block_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Other Journey Stories from Senior Partners';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = ' <p>Get the complete Journey Story series (April 2013), arranged by category, or <a href="http://home.intranet.mckinsey.com/intranet/" class="blue-text" target="_blank">search Know</a> for all of them. </p';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_leadership_or_expertise']['id'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['field'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['label'] = '';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_leadership_or_expertise']['element_label_colon'] = FALSE;
  /* Field: Content: Link */
  $handler->display->display_options['fields']['field_know_link']['id'] = 'field_know_link';
  $handler->display->display_options['fields']['field_know_link']['table'] = 'field_data_field_know_link';
  $handler->display->display_options['fields']['field_know_link']['field'] = 'field_know_link';
  $handler->display->display_options['fields']['field_know_link']['label'] = '';
  $handler->display->display_options['fields']['field_know_link']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_know_link']['element_label_colon'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  /* Field: Content: Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'field_data_field_image';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_image']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    37 => '37',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';

  /* Display: Journey Video Highlights */
  $handler = $view->new_display('block', 'Journey Video Highlights', 'block_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Journey Video Highlights';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'h6';
  $handler->display->display_options['fields']['title']['element_class'] = 'name';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Content: Video Duration */
  $handler->display->display_options['fields']['field_video_duration']['id'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['table'] = 'field_data_field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['field'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['label'] = '';
  $handler->display->display_options['fields']['field_video_duration']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_video_duration']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content: Section */
  $handler->display->display_options['fields']['field_lead_or_exp']['id'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['field'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['label'] = '';
  $handler->display->display_options['fields']['field_lead_or_exp']['element_label_colon'] = FALSE;
  /* Field: Content: Video */
  $handler->display->display_options['fields']['field_video']['id'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['table'] = 'field_data_field_video';
  $handler->display->display_options['fields']['field_video']['field'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['label'] = '';
  $handler->display->display_options['fields']['field_video']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_video']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_video']['type'] = 'file_url_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    36 => '36',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';
  $export['journeystories'] = $view;

  $view = new view();
  $view->name = 'whatisrr';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Whatisrr';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Thoughts on Reach and Relevance';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '      
       <div class="section filters white">
        <div class="container">
          <div class="row">
            <div class="col s12">

            <!--   <ul class="tabs">
                <li><span>What others are doing / </span> </li>
                <li class="tab"><a class="active" href="#stories-section">Get Inspired stories</a></li>
                <li class="tab"><a href="#compendiums-section">Compendiums of 200+ examples</a></li>
                <li class="tab"><a href="#journey-section">Journey stories</a></li>
              </ul>
              -->
                <div id="filters" class="button-group linktabs">
           
                            <ul>
                                <li><span>What is R&R and why does it matter? / </span> </li>
                                <li>
                                  <span>
                             
                                      <a href="whatisrr.html" class="active">What is R&R?</a>
                                  </span>
                                </li>

                                <li>
                                      <span>
                                          <a href="whyitmatters.html">Why does R&R matter?</a>
                                       
                                        </span>
                       
                                </li>
                               
                          </ul>

              </div>
             
              <hr>
               <div class="col s12 m12 12">
                  <div class="card-panel">
                     <h2 class="section-title"> What is R&R?</h2>
                      <div class="row">

                        <div class="col s12 m3 l3 xl2">
                          <img src="images/personplaceholder.png" alt="" class="circle responsive-img"> 
                          
                                <div class="name">Peter Dahlstrom</div>
                                <div class="jobtitle">Senior Partner, Client and Firm Communications</div>
                        </div>
                        <div class="col s12 m9 l9 xl10">
                          <p>
                          Reach and Relevance is critically important to our mission of delivering lasting client impact. Through greater  “reach,” we connect with an ever expanding network of clients, potential clients, and other influencers. Through greater “relevance,” we bring value to that network by sharing distinctive knowledge and insights into their business, economic and societal context.
                          </p>
                          <p>
                          Leverage this website to build a case for R&R, identify your support network, browse through inspirational examples of R&R from others at the firm, find tools and resources, and get guidance on how to design and implement a Reach and Relevance journey.
                         </p>
                          <b>A few things to keep in mind as you get started:</b>
                          <p><span class="blue-text">Partners will prioritize R&R differently</span>. For some people R&R is a big priority. For some, it’s an enabler of other priorities. While others still are just getting started in their R&R journey. Not everyone has to have the same goals or path.
                          </p>
                          <p>
                          <span class="blue-text">A successful R&R strategy doesn\'t happen overnight</span>. As you get started, you might aspire to creating a strong foundation – getting to a baseline level of R&R. Remember, it’s the small persistent steps that will take you where you want to go. Setting achievable goals along the way will help build necessary momentum to make lasting impact.<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is: </span> Following a strategic approach in developing and achieving a vision, leveraging a mix of channels over time, and evaluating and adjusting performance over time<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is not:</span> Non-strategic, ad hoc external reputation-building activities
                        </p>


                        
                        </div>
                      </div>
                    </div>
                 </div><!--s12-->
            </div>
          
          </div><!-- row-->
        
        </div><!-- container-->
      </div><!-- section-->';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_leadership_or_expertise']['id'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['field'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['label'] = '';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_leadership_or_expertise']['element_label_colon'] = FALSE;
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
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['id'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['field'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['value'] = array(
    33 => '33',
  );

  /* Display: What is R&R? */
  $handler = $view->new_display('page', 'What is R&R?', 'page');
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  $handler->display->display_options['path'] = 'whatisrr';

  /* Display: Thoughts on Reach and Relevance: */
  $handler = $view->new_display('block', 'Thoughts on Reach and Relevance:', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Thoughts on Reach and Relevance';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Content: Video Duration */
  $handler->display->display_options['fields']['field_video_duration']['id'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['table'] = 'field_data_field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['field'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['label'] = '';
  $handler->display->display_options['fields']['field_video_duration']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_video_duration']['element_label_colon'] = FALSE;
  /* Field: Content: Section */
  $handler->display->display_options['fields']['field_lead_or_exp']['id'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['field'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['label'] = '';
  $handler->display->display_options['fields']['field_lead_or_exp']['element_label_colon'] = FALSE;
  /* Field: Content: Video */
  $handler->display->display_options['fields']['field_video']['id'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['table'] = 'field_data_field_video';
  $handler->display->display_options['fields']['field_video']['field'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['label'] = '';
  $handler->display->display_options['fields']['field_video']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_video']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_video']['type'] = 'file_url_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    0 => '32',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';
  $handler->display->display_options['block_description'] = 'Thoughts on Reach and Relevance';

  /* Display: Why does Reach and Relevance matter? */
  $handler = $view->new_display('block', 'Why does Reach and Relevance matter?', 'block_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Thoughts on Reach and Relevance:';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Content: Video Duration */
  $handler->display->display_options['fields']['field_video_duration']['id'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['table'] = 'field_data_field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['field'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['label'] = '';
  $handler->display->display_options['fields']['field_video_duration']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_video_duration']['element_label_colon'] = FALSE;
  /* Field: Content: Section */
  $handler->display->display_options['fields']['field_lead_or_exp']['id'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['field'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['label'] = '';
  $handler->display->display_options['fields']['field_lead_or_exp']['element_label_colon'] = FALSE;
  /* Field: Content: Video */
  $handler->display->display_options['fields']['field_video']['id'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['table'] = 'field_data_field_video';
  $handler->display->display_options['fields']['field_video']['field'] = 'field_video';
  $handler->display->display_options['fields']['field_video']['label'] = '';
  $handler->display->display_options['fields']['field_video']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_video']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_video']['type'] = 'file_url_plain';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    0 => '34',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';
  $handler->display->display_options['block_description'] = 'Thoughts on Reach and Relevance';
  $export['whatisrr'] = $view;

  $view = new view();
  $view->name = 'whyitmatter';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'whyitmatter';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Thoughts on Reach and Relevance';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '      
       <div class="section filters white">
        <div class="container">
          <div class="row">
            <div class="col s12">

            <!--   <ul class="tabs">
                <li><span>What others are doing / </span> </li>
                <li class="tab"><a class="active" href="#stories-section">Get Inspired stories</a></li>
                <li class="tab"><a href="#compendiums-section">Compendiums of 200+ examples</a></li>
                <li class="tab"><a href="#journey-section">Journey stories</a></li>
              </ul>
              -->
                <div id="filters" class="button-group linktabs">
           
                            <ul>
                                <li><span>What is R&R and why does it matter? / </span> </li>
                                <li>
                                  <span>
                             
                                      <a href="whatisrr.html" class="active">What is R&R?</a>
                                  </span>
                                </li>

                                <li>
                                      <span>
                                          <a href="whyitmatters.html">Why does R&R matter?</a>
                                       
                                        </span>
                       
                                </li>
                               
                          </ul>

              </div>
             
              <hr>
               <div class="col s12 m12 12">
                  <div class="card-panel">
                     <h2 class="section-title"> What is R&R?</h2>
                      <div class="row">

                        <div class="col s12 m3 l3 xl2">
                          <img src="images/personplaceholder.png" alt="" class="circle responsive-img"> 
                          
                                <div class="name">Peter Dahlstrom</div>
                                <div class="jobtitle">Senior Partner, Client and Firm Communications</div>
                        </div>
                        <div class="col s12 m9 l9 xl10">
                          <p>
                          Reach and Relevance is critically important to our mission of delivering lasting client impact. Through greater  “reach,” we connect with an ever expanding network of clients, potential clients, and other influencers. Through greater “relevance,” we bring value to that network by sharing distinctive knowledge and insights into their business, economic and societal context.
                          </p>
                          <p>
                          Leverage this website to build a case for R&R, identify your support network, browse through inspirational examples of R&R from others at the firm, find tools and resources, and get guidance on how to design and implement a Reach and Relevance journey.
                         </p>
                          <b>A few things to keep in mind as you get started:</b>
                          <p><span class="blue-text">Partners will prioritize R&R differently</span>. For some people R&R is a big priority. For some, it’s an enabler of other priorities. While others still are just getting started in their R&R journey. Not everyone has to have the same goals or path.
                          </p>
                          <p>
                          <span class="blue-text">A successful R&R strategy doesn\'t happen overnight</span>. As you get started, you might aspire to creating a strong foundation – getting to a baseline level of R&R. Remember, it’s the small persistent steps that will take you where you want to go. Setting achievable goals along the way will help build necessary momentum to make lasting impact.<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is: </span> Following a strategic approach in developing and achieving a vision, leveraging a mix of channels over time, and evaluating and adjusting performance over time<br>
                        </p>
                        <p>
                          <span class="blue-text">Reach and Relevance is not:</span> Non-strategic, ad hoc external reputation-building activities
                        </p>


                        
                        </div>
                      </div>
                    </div>
                 </div><!--s12-->
            </div>
          
          </div><!-- row-->
        
        </div><!-- container-->
      </div><!-- section-->';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_leadership_or_expertise']['id'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['field'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['label'] = '';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_leadership_or_expertise']['element_label_colon'] = FALSE;
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
  /* Filter criterion: Broken/missing handler */
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['id'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['field'] = 'field_leadership_or_expertise_tid';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_leadership_or_expertise_tid']['value'] = array(
    34 => '34',
  );
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';

  /* Display: Why it matters */
  $handler = $view->new_display('page', 'Why it matters', 'page');
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['format'] = 'php_code';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['path'] = 'whyitmatters';

  /* Display: Why does Reach and Relevance matter? */
  $handler = $view->new_display('block', 'Why does Reach and Relevance matter?', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Why does Reach and Relevance matter?';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'container2';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = '          
                 <p class="font14">Reach and Relevance is central to our client impact because it helps us: </p>
                 <div class="col xl12 l12 m12 s12" data-equalizer="history" data-equalize-by-row="true">
                  <div class="col xl3 l6 m6 s12">
                      <div class="valign-wrapper" data-equalizer-watch="history">
                          <img src="sites/all/themes/reach/images/matters-1.png"/> <span class="name">Develop partners who are “trusted peers” of influential leaders</span>
                      </div>
                  </div>
                  <div class="col xl3 l6 m6 s12">
                      <div class="valign-wrapper" data-equalizer-watch="history">
                          <img src="sites/all/themes/reach/images/matters-2.png"/> <span class="name">Creates “good will” with our communities</span>
                      </div>
                  </div>
                  <div class="col xl3 l6 m6 s12">
                      <div class="valign-wrapper" data-equalizer-watch="history">
                          <img src="sites/all/themes/reach/images/matters-3.png"/> <span class="name">Stimulates client discussions and supports clientele development efforts</span>
                      </div>
                  </div>
                   <div class="col xl3 l6 m6 s12">
                      <div class="valign-wrapper" data-equalizer-watch="history">
                          <img src="sites/all/themes/reach/images/matters-4.png"/> <span class="name">Improves our relevance & impact in client service</span>
                      </div>
                  </div>
                </div>
               
           ';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Field: Thumbnail */
  $handler->display->display_options['fields']['field_thumbnail']['id'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['table'] = 'field_data_field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['field'] = 'field_thumbnail';
  $handler->display->display_options['fields']['field_thumbnail']['label'] = '';
  $handler->display->display_options['fields']['field_thumbnail']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_thumbnail']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_thumbnail']['settings'] = array(
    'image_style' => 'thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Bio info */
  $handler->display->display_options['fields']['field_bio_info']['id'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['table'] = 'field_data_field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['field'] = 'field_bio_info';
  $handler->display->display_options['fields']['field_bio_info']['label'] = '';
  $handler->display->display_options['fields']['field_bio_info']['element_label_colon'] = FALSE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['field_leadership_or_expertise']['id'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['table'] = 'field_data_field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['field'] = 'field_leadership_or_expertise';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['label'] = '';
  $handler->display->display_options['fields']['field_leadership_or_expertise']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_leadership_or_expertise']['element_label_colon'] = FALSE;
  /* Field: Content: Video Duration */
  $handler->display->display_options['fields']['field_video_duration']['id'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['table'] = 'field_data_field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['field'] = 'field_video_duration';
  $handler->display->display_options['fields']['field_video_duration']['label'] = '';
  $handler->display->display_options['fields']['field_video_duration']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_video_duration']['element_label_colon'] = FALSE;
  /* Field: Content: Section */
  $handler->display->display_options['fields']['field_lead_or_exp']['id'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['field'] = 'field_lead_or_exp';
  $handler->display->display_options['fields']['field_lead_or_exp']['label'] = '';
  $handler->display->display_options['fields']['field_lead_or_exp']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Section (field_lead_or_exp) */
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['id'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['table'] = 'field_data_field_lead_or_exp';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['field'] = 'field_lead_or_exp_tid';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['operator'] = 'and';
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['value'] = array(
    0 => '34',
  );
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_lead_or_exp_tid']['vocabulary'] = 'leadership_or_expertise_type';
  $handler->display->display_options['block_description'] = 'whyitmatters -Why does Reach and Relevance matter?';
  $export['whyitmatter'] = $view;

  return $export;
}
