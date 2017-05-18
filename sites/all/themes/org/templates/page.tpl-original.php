<?php
/**
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/garland.
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
 * - $secondary_menu_heading: The title of the menu used by the secondary links.
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
 * - $page['header']: Items for the header region.
 * - $page['navigation']: Items for the navigation region, below the main menu (if any).
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 * - $page['bottom']: Items to appear at the bottom of the page below the footer.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see zen_preprocess_page()
 * @see template_process()
 */
  $theme_url = variable_get('theme_url', '');
  $base_url  = variable_get('base_url', '');
?>

 <!-- top banner -->
    
    
    <div class="header-bar"> 
        <div id="top_header" class="container">
            <div id="top_header_headline" class="">              
                  
              <?php if ($site_name || $site_slogan): ?>
                  <div id="name-and-slogan">
                    <?php if ($site_name): ?>
                      <?php if ($title): ?>
                        <div id="site-name">
                          <a href="<?php print $front_page; ?>" title="<?php print t('Food Institute'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
                        </div>
                      <?php else: /* Use h1 when the content title is empty */ ?>
                        <h1 id="site-name">
                          <a href="<?php print $front_page; ?>" title="<?php print t('Food Institute'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
                        </h1>
                      <?php endif; ?>
                    <?php endif; ?>

                    <?php if ($site_slogan): ?>
                      <div id="site-slogan"><?php print $site_slogan; ?></div>
                    <?php endif; ?>
                  </div><!-- /#name-and-slogan -->
              <?php endif; ?>

            </div>
        
            <div id="top_header_logo" class="">
              <a href="#">
                  <img src="<?php echo $theme_url; ?>/images/header_logo.png" alt="">
              </a>  
              
            </div>

         </div>
    </div>
    <!-- top banner end -->
    
    

    <div class="container full col-lg-12">

        <div class="container top">

          <nav class="navbar navbar-default" role="navigation">
            
            <div class="container-fluid">
              <!-- Brand and toggle get grouped for better mobile display -->
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
               
              </div>

              <div class="collapse navbar-collapse full-width" id="bs-example-navbar-collapse-1">

                <div class="left">
                   <!--  <ul class="nav navbar-nav vertical">
                      <li><span>Overview</span></li>
                        <li><span>Opportunity</span></li>
                        <li><span>Meet our experts</span></li>
                        <li><span>Our approach</span></li>
                        <li><span>Capability building</span></li>
                        <li><span>tools &amp; resources</span></li>
                    </ul> -->

                    <?php if ($main_menu || $secondary_menu): ?>
                      <?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('nav', 'navbar-nav', 'vertical')))); ?>
                    <?php endif; ?>

                </div>
                <div class="right" style="width:29%;">
                    <div id="searchbox" class="col-xs-4">
                      <?php print render($page['header']); ?>
                      
                    </div>
                </div>
                <div class="c"></div>

              </div><!-- /.navbar-collapse -->

            </div><!-- /.container-fluid -->

         </nav>

         <?php if ($is_front): ?>

             <?php print render($page['slider']); ?>
            </div>  <!-- /.container-->
      
     
            <div class="container middle col-lg-12">
              
               <div class="row col-lg-12">
                
                <?php print render($page['highlighted']); ?>
               </div>
            </div> 
               
            <div class="col-lg-12 col-xs-12 container bottom">
                
                <?php print render($page['bottom']); ?> 
              
            </div>
            
            <div class="c"></div>

          <?php else: ?>

            <div class="col-lg-12 home">
                <?php print $breadcrumb; ?>
            </div>
            <!-- Left Content Part -->
            <div class="left-side col-xs-9 col-sm-9 col-xs-12 down">
              <?php print render($page['content']); ?>
            </div>
            <!-- /Left Content Part -->
            <!-- Right Content Part -->
            <div class="right-side col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <?php print render($page['sidebar_second']); ?>
            </div>
            <!-- /Right Content Part -->
            </div>
            <div class="c"></div>
         <?php endif; ?>

         
        <!-- footer --> 
        <div class="col-lg-12 footer-container">
              <?php print render($page['footer']); ?> 
        </div>
          <!-- footer end --> 
   </div>
   
    <!-- container end -->
