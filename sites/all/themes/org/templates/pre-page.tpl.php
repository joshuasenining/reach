<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page.
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
?>
 <body style="">
  
   
  
  
    <!-- top banner -->
    
    
    <div class="header-bar"> 
    
        <div id="top_header" class="">
        
              <div id="top_header_logo" class="">
                  
                <a href="#" > 
                
                  <img src="./images/header_logo.png" alt="">
                
                </a>  
              
              </div>
              
              <div id="top_header_headline" class="">
              
                  GBS Senior Leader’s Forum
              
              </div>
              
              
               <div id="top_header_searchbox" class="">
              
                  <form action="demo_form_search.asp">
                    
                        <input class="search" type="text" placeholder="Search">
                        
                        
                        <button class="search_submit">Search</button>
                    
                    </form>
              
              </div>
              
         </div>
       
    </div>
    <!-- top banner end -->

    <div class="container">
 
    <div class="left-side col-xs-9">

    <!-- page header -->
      <div class="row page-header">
      <!-- copy -->
        <div class="col-xs-6">
          <h1>Global Business Services Senior Leader's Forum</h1>
          <p class="lead">The Global Business Services Senior Leader's Forum is a McKinsey initiative to bring together leading Shared Services experts to share best practices and test ideas on a range of support function transformation issues.</p>
        </div>
      <!-- copy end-->
      <img src="./images/globe.png" class="col-xs-6"/>
      

      <!-- top menu -->
      <ul class="col-xs-12 menu vertical">
        <li><a href="#"><img src="./images/categories-icon.png"/>Categories</a></li>
        <li><a href="#"><img src="./images/research-icon.png"/>Research & White Papers</a></li>
      <li><a href="#"><img src="./images/contact-icon.png"/>Contact Us</a></li>
      </ul>
      <!-- top menu end -->
      </div>
     <!-- page header end -->


     <!-- forum section --> 

     <!-- entry -->
     <h3 class="forum">Latest Forums</h3>

     <div class="row entry">
     <img class="col-xs-3" src="./images/light-bulb.jpg"/>

     <div class="col-xs-9">
     <h4>Global Business Services Forum #10</h4>
     <h5>Forum date:</h5>
     <h6>November 12, 2013</h6>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
     <a href="#">View full forum details »</a>
     </p>
     <ul class="vertical entry">
     <li><a href="#"><img src="./images/download.png"/>Download full presentation</a></li>
     <li><a href="#"><img src="./images/share.png"/>Share</a></li>
     </ul>
     </div>
     <!-- entry end -->

     </div>


     <!-- entry --> 
     <div class="row entry borders">
     <img class="col-xs-3" src="./images/people.jpg"/>
     <div class="col-xs-9">
     <h4>Global Business Services Forum #11</h4>
     <h5>Forum date:</h5>
     <h6>November 12, 2013</h6>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi.
     <a href="#">View full forum details »</a>
     </p>
     <ul class="vertical entry">
     <li><a href="#"><img src="./images/download.png"/>Download full presentation</a></li>
     <li><a href="#"><img src="./images/share.png"/>Share</a></li>
     </ul>
     </div>
     </div>
     <!-- entry end --> 

     <!-- entry --> 
     <div class="row entry">
     <img class="col-xs-3" src="./images/chalkboard.jpg"/>
     <div class="col-xs-9">
     <h4>Global Business Services Forum #12</h4>
     <h5>Forum date:</h5>
     <h6>November 12, 2013</h6>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi.
     <a href="#">View full forum details »</a>
     </p>
     <ul class="vertical entry">
     <li><a href="#"><img src="./images/download.png"/>Download full presentation</a></li>
     <li><a href="#"><img src="./images/share.png"/>Share</a></li>
     </ul>
     </div>
     </div>
     <!-- entry end --> 

     <a href="#" class="link col-xs-12">More forums</a>
     </div>
     <!-- left-side end -->

     <!-- right-side -->
     <div class="right-side col-xs-3">

       <!-- entry --> 
        <div class="entry">
        <h3>Login</h3>
        <p>Please log in for full access 
    to the site</p>
        <form action="demo_form.asp">
        <input type="text" placeholder="Enter your email">
        <input type="text" placeholder="Enter your email">
        <button class="sign-in"> Sign In</button>
        </form>
        <ul class="vertical login">
        <li><a href="#"><p>Contact the McKinsey Operations Practice</p></a></li>
        <li><a href="#"><p>Contact the McKinsey Business Technology Office</p></a></li>
        </ul>
        </div>
         <!-- entry end --> 

         <!-- entry end --> 
        <div class="entry borders">
        <h3>McKinsey-on-Business Technology App</h3>
        <img src="./images/ipad.png"/>
        <p>Avialable for iPhone and/or iPad using one of the following methods by either searching <a href="#">"McKinsey"</a> in the App Store or clicking the button below</p>
        <img src="./images/app-store.png"/>
        </div>
         <!-- entry end --> 

         <!-- entry --> 
        <div class="entry">
        <h3>Operations Extranet</h3>
        <img src="./images/extranet.jpg" width="165"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</p>
        <a href="#">Visit site&nbsp;&nbsp;<img src="./images/arrow.png"/></a>
        </div>
         <!-- entry end --> 
        
      </div>
      <!-- right-side end -->


      <!-- footer --> 
      <footer class="col-xs-12"> 
      <ul class="vertical">
      <li><a href="#">Home</a></li>
      <li><a href="#">Operations Practice</a></li>
      <li><a href="#">Business Technology Office</a></li>
      </ul>

      <ul class="vertical">
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms & Conditions</a></li>
      <li><a href="#">&copy; 1996-2014 McKinsey & Company</a></li>
      </ul>
      </footer>
      <!-- footer end --> 
   
    </div> 
    <!-- container end -->

    <script src="./js/jquery-1.10.2.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
</body>