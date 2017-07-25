<?php
/**
 * @file
 * Materialize theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */

?>

    <nav class="nav-extended">
        <div class="nav-wrapper">
            <a href="http://home.intranet.mckinsey.com/" target="_blank" class="brand-logo"><img src="<?php print $logo; ?>"></a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

            <ul class="side-nav" id="mobile-demo">
                 <?php
                      print theme('links__system_main_menu', array(
                        'links' => $main_menu,
                        'attributes' => array(
                          'class' => array('navbar', 'clearfix'),
                        )
                      )); ?>


            </ul>
        </div>
        <div class="nav-content">

            <ul class="menutabs" id="nav-mobile">

                 <?php if ($main_menu): ?>
                  <nav class="main-menu" role="navigation">
                    <?php
                    print theme('links__system_main_menu', array(
                      'links' => $main_menu,
                      'attributes' => array(
                        'class' => array('navbar'),
                      ),
                      'heading' => array(
                        'text' => t(''),
                        'level' => 'span',
                        'class' => array('portaltitle','pull-left'),
                      ),
                    )); ?>
                  </nav>
              <?php endif; ?>
    </ul>
        </div>
    </nav>
    <div class="white">
  <?php if (!empty($page['header'])): ?>
    <div class="top">
      <?php print render($page['header']); ?>
    </div>
  <?php endif; ?><!-- /.header  -->
  <?php global $base_url; ?>
   <div class="section description">        

                 <div class="container">
                           <?php

                                        $block = module_invoke('block', 'block_view', '12');
                                        print render($block['content']);
                                    
                     
                          ?> <!--R&R Journey Stories-->
                </div>
    </div><!--section-->
    </div>
               
 <div class="section lightgraybk">
         <div class="container">
        
            <div class="row">
            <div class="col xl9 l8 m7 s12 lightgraybk">
             <div class="row seniorpartners" data-equalizer="sp">
                   <?php
                                  
                                    $blockObject = block_load('views', 'journeystories-block_3');
                                    
                                    $block = _block_get_renderable_array(_block_render_blocks(array($blockObject)));
                                    
                                    $output = drupal_render($block);
                                    print $output;
                                    
                          ?><!--highlights from senior partners-->


              </div><!--seniorpartners-->
               <div class="section">

                       <?php

                                    $block = module_invoke('block', 'block_view', '10');
                                    print render($block['content']);
                                
                 
                      ?> <!--HIGHLIGHTS FROM EMS AND APS-->
              </div>
               <div class="section otherjourney">
                      <div class="row" data-equalizer="otherjourney" data-equalize-by-row="true">    
                           <?php
                                        
                                          $blockObject = block_load('views', 'journeystories-block_2');
                                          
                                          $block = _block_get_renderable_array(_block_render_blocks(array($blockObject)));
                                          
                                          $output = drupal_render($block);
                                          print $output;
                                          
                                ?><!-- other journey stories from senior partners-->
                      </div>
                </div>
               <?php if (!empty($page['graysectioncontent'])): ?>
          
                  <div>
                      

                           <?php print render($page['graysectioncontent']); ?>
                    
                  </div>
                  <?php endif; ?>
            
            </div><!--l9-->
          <div class="col xl3 l4 m5 s12 sidebar">
            <div class="white">
             <?php
                                  
                                    $blockObject = block_load('views', 'journeystories-block_1');
                                    
                                    $block = _block_get_renderable_array(_block_render_blocks(array($blockObject)));
                                    
                                    $output = drupal_render($block);
                                    print $output;
                                    
                          ?><!-- other journey stories from senior partners-->
                        </div>
                        
        </div><!-- sidebar-->
        </div><!-- row-->
  </div><!-- container--> 
</div><!-- section-->
<?php global $base_url; ?>



    <div class="divider"></div>
      <footer class="page-footer">

          <div class="footer-copyright">
              <div class="container">
                
                  <span class="brand-logo"><img src="<?php print $base_url; ?>/sites/all/themes/reach/images/logo-main-fff.svg"></span>

                  <?php
                  $footer_menu = menu_navigation_links('menu-footer-menu');
                  print theme('links__menu_menu_footer_menu', array(
                      'links' => $footer_menu,
                      'attributes' => array(
                          'id' => 'footer-links',
                          'class' => array('blue-text'),
                      ),
                  ));
                   ?>
              </div>
          </div>
      </footer>
<div id="modal" class="videowrapper">

    <div class="iziModal-header-buttons">
        <a href="javascript:void(0)" class="iziModal-button iziModal-button-close" data-izimodal-close=""></a>
    </div>
    <video class="popup-video" controls>
        <source src="" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
</div>