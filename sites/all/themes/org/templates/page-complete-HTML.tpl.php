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
    
        <div id="top_header" class="">
        
              <div id="top_header_logo" class="">
                  
                <a href="#" > 
                
                  <img src="<?php echo $theme_url; ?>/images/header_logo.png" alt="">
                
                </a>  
              
              </div>
              
              <div id="top_header_headline" class="">
              
                  Org Inside <span class="light-font">Rich Media Library</span>
              
              </div>

              
         </div>
       
    </div>
    <!-- top banner end -->

    <div class="landing ">

      


      <div class="container">
    
        <div class="left-side col-xs-9 down">
        <!-- Left section --> 

          <!-- Featured Section -->
          <div class="featured no-lr-pad">
            
            <div class="main-box ">
              <div class="col-xs-1 arrow left">
                <a href="#" >
                  <img src="<?php echo $theme_url; ?>/images/arrow_left.png"/>
                </a>
              </div>
              <div class="col-xs-4 left no-lr-pad">
                <h3>Featured videos</h3>
                <h1>Hudson River Crash Landing</h1>
                <p>CBS interview broadcast 08/02/09 featuring flight captain Chelsea Sullenberger who successfully landed United flight 1459 on the Hudson River, after both engines failed.</p>
                <p class="small-font"> Tags: <a href="#">Organisational Design</a></p> 
                 <ul class="vertical entry right light small-font">
                  <li><a href="#">104 views</a></li>
                  <li><a href="#">54 likes &nbsp;&nbsp;<img src="<?php echo $theme_url; ?>/images/check_orange.png"/></a></li>
                </ul>

              </div>

              <div class="col-xs-4 fixed-featured-img-width">
                <img class="featured-image" src="<?php echo $theme_url; ?>/images/top-video.png"/>
                <ul class="vertical entry left featured-image-footnotes">
                  <li><a href="#"><img src="<?php echo $theme_url; ?>/images/download_blue.png"/>Download video</a></li>
                  <li class="f-right no-lr-mar"><a href="#"><img src="<?php echo $theme_url; ?>/images/arrow_blue.png"/>View More on this topic</a></li>
                </ul>
               
              </div>

              <div class="col-xs-1 arrow right no-lr-pad">
                
                <a href="#">
                  <img src="<?php echo $theme_url; ?>/images/arrow_right.png"/>
                </a>
              </div>

              <div class="c"></div>
            
            </div>

            <div class="c"></div>
          </div>
          <!-- / Featured Section -->

          <!-- Divider-Filter Section -->
          <div class="divider col-xs-12 no-lr-pad">
            <span class="capital-heading">organise by: </span>
            
              
              <div class="col-xs-12 list divider-body grey-bg no-lr-pad">
                
                <ul class="vertical entry outline-list">
                  <li id="first">
                      <select id="source">
                          <option selected="selected" value="BR">Recently Added</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="IN">Pakistan</option>
                          <option value="JP">Japan</option>
                          <option value="RS">Serbia</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                      </select>
                  </li>
                  <li id="second">
                      <select id="source">
                          <option selected="selected" value="BR">Theme</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="IN">Pakistan</option>
                          <option value="JP">Japan</option>
                          <option value="RS">Serbia</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                      </select>
                  </li>
                  <li id="third">
                      <select id="source">
                          <option selected="selected" value="BR">Program</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="IN">Pakistan</option>
                          <option value="JP">Japan</option>
                          <option value="RS">Serbia</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                      </select>
                  </li>
                  <li id="forth">
                      <select id="source">
                          <option selected="selected" value="BR">Usage Cost</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="IN">Pakistan</option>
                          <option value="JP">Japan</option>
                          <option value="RS">Serbia</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                      </select>
                  </li>
                </ul>
              </div>
             <!--  <div id="searchbox" class="col-xs-4">
                
                <form action="demo_form_search.asp">
                  <input class="search" type="text" placeholder="Search...">
                  <button class="search_submit">Search</button>                    
                </form>
              </div> -->
            
          </div>
          <!-- / Divider-Filter Section -->

          <!-- Video Section -->
          <div class="video-container">
          
              <div class="row entry up">
                
                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video1.png"/>
                  <h4 class="normal-weight"><a href="#">Global Business Services Forum #10</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. </p>
                  <span class="category">Category: </span>
                  <a  class="category" href="#">Organizational Design</a>
                  <ul class="stats vertical">
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                  </ul>
                </div>

        
                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video2.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                   </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>
                   <ul class="stats vertical">
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                   </ul>

                </div>

       
                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video3.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                      </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>

                      <ul class="stats vertical">
                        <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                      </ul>

                </div>

                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video1.png"/>
                  <h4 class="normal-weight"><a href="#">Global Business Services Forum #10</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. </p>
                  <span class="category">Category: </span>
                  <a  class="category" href="#">Organizational Design</a>
                  <ul class="stats vertical">
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                    <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                  </ul>
                </div>
                <div class="c"></div>

                
              </div>
        
              <div class="row entry up">


                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video4.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                      </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>
                      <ul class="stats vertical">
                        <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                      </ul>

                </div>

        
                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video5.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                      </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>
                      <ul class="stats vertical">
                        <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                      </ul>

                </div>

       
                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video6.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                      </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>
                      <ul class="stats vertical">
                        <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                      </ul>

                </div>


                <div class="col-xs-3">
                  <img class="col-xs-12 video-frame" src="<?php echo $theme_url; ?>/images/video4.png"/>
                   <h4 class="normal-weight">Global Business Services Forum #10</h4>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
                      </p><span class="category">Category: </span><a  class="category" href="#">Organizational Design</a>
                      <ul class="stats vertical">
                        <li><a href="#"><img src="<?php echo $theme_url; ?>/images/check_gray.png"/>23</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/comment_gray.png"/>3</a></li>
                      <li><a href="#"><img src="<?php echo $theme_url; ?>/images/clock_orange.png"/>08:45</a></li>
                      </ul>

                </div>
                <div class="c"></div>
              </div>

              <a href="#" class="link read-more col-xs-12">More videos...</a>
          
          </div>
          <!-- / Video Section -->
        
        </div>
        <!-- / Left section -->

        <!-- Right-side -->
        <div class="right-side col-xs-3">

          <div id="searchbox" class="col-xs-4 no-lr-pad">
                
            <form action="#">
              <input class="search" type="text" placeholder="Search...">
              <button class="search_submit">Search</button>                    
            </form>
          </div>

          <h2 class="capital-heading">Browse By</h2>
          
          <div class="entry right-side-content-box">
            
            <h3>Programs</h3>
            <ul class="categories">

              <li>McKinsey Leadership Development</li>
              <li>Transformational Change</li>
              <li>Organization Design</li>
              <li>Organizational Insights</li>
              <li>Merger Management</li>
              <li>Human Capital</li>
              <li>Cross Cutting Themes</li>
            </ul>
          </div>

          <div class="entry right-side-content-box">
            
            <h3>Usage</h3>
            <ul class="categories">

              <li>Workshop</li>
              <li>Keynote Speeches</li>
              <li>External Marketing</li>
              <li>Internal Learning</li>
              
            </ul>
          </div>

          <div class="entry right-side-content-box">
            
            <h3>Theme</h3>
            <ul class="categories">

              <li>Change</li>
              <li>Collaboration</li>
              <li>Communication</li>
              <li>Energisers</li>
              <li>Leadership</li>
              <li>Storytelling</li>
              <li>Teamwork</li>
              <li>Transformation</li>

            </ul>
          </div>

          <!-- Right Side Content Box (Playlist) -->
          <div class="entry right-side-content-box">
            
            <h3>My Playlist</h3>
              
              <div class="playlist"> 
              
                <img src="<?php echo $theme_url; ?>/images/playlist1.png" class="col-xs-3"/>
                <div class="col-xs-9">
                  <h4 class="small-weight">Playlist video 1</h4>
                  <ul class="vertical entry light">
                    <li><a href="#">Download</a></li>
                    <li><a href="#">Share</a></li>
                 </ul>
                </div>

              </div>

              <div class="playlist"> 
                <img src="<?php echo $theme_url; ?>/images/playlist2.png" class="col-xs-3"/>
                  <div class="col-xs-9">
                    <h4 class="small-weight">Playlist video 2</h4>
                      <ul class="vertical entry light">
                        <li><a href="#">Download</a></li>
                        <li><a href="#">Share</a></li>
                     </ul>
                  </div>
              </div>

              <div class="playlist"> 
              
              <img src="<?php echo $theme_url; ?>/images/playlist3.png" class="col-xs-3"/>
                <div class="col-xs-9">
                  <h4 class="small-weight">Playlist video 3</h4>
                  <ul class="vertical entry light">
                   <li><a href="#">Download</a></li>
                   <li><a href="#">Share</a></li>
                  </ul>
               </div>
            </div>

            <div class="playlist"> 
              <img src="<?php echo $theme_url; ?>/images/playlist4.png" class="col-xs-3"/>
                <div class="col-xs-9">
                  <h4 class="small-weight">Playlist video 4</h4>
                  <ul class="vertical entry light">
                     <li><a href="#">Download</a></li>
                     <li><a href="#">Share</a></li>
                  </ul>
                </div>
            </div>

            <a href="#" class="blue-link">Manage playlist&nbsp;<img class="playlist-img" src="<?php echo $theme_url; ?>/images/playlist-arrow-2.png"/></a>
          

          </div>
          <!-- /Right Side Content Box (Playlist) -->

          <!-- Right Side Content Box (Copyright Stuff) -->
          <div class="entry right-side-content-box grey-bg readable-padding">
              <h6>Copyright</h6><br />
              <span class="grey-text small-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span>
              <br /><br />
              <h6>Usage</h6><br />
              <span class="grey-text small-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span>
              <br /><br />
              <h6>Cost</h6><br />
              <span class="grey-text small-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span>

          </div>
          <!-- /Right Side Content Box (Copyright Stuff) -->

        </div>
        <!-- / Right-side --> 

      </div>

      <!-- footer --> 
      <footer class="col-xs-12 "> 
 
        <div class="container">
        <ul class="vertical footer">
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">&copy; 1996-2014 McKinsey & Company</a></li>
        </ul>
      </footer>
      
      </div>
      <!-- footer end --> 
   
    </div> 
    <!-- container end -->
