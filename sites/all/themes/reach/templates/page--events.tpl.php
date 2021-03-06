  <?php
  $theme_url = variable_get('theme_url', '');
  $base_url  = variable_get('base_url', '');
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
   <div>
  <?php if (!empty($page['header'])): ?>
    <div class="top">
      <?php print render($page['header']); ?>
    </div>
  <?php endif; ?><!-- /.header  -->
  <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted"><?php print render($page['highlight']); ?></div>
      <?php endif; ?>

      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>


      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
     
      <?php print render($tabs_secondary); ?>
</div>
<?php global $base_url; ?>
 
<div class="row page">
    
<section class="upcomingeventspage">
    <div class="container">


      <div class="col xl4 l4 m4 s12">
      <div class="calendarmap">
           <?php print render($page['left']); ?>
      </div>
         <div id="event-listing-mark" class="upcoming-events">Upcoming Events</div>
        <?php print render($page['content']); ?>
      </div>
      <div class="col xl8 m8 s12">
             
              <?php
                                       
                                                       
                                                             print views_embed_view('calendar', 'page_1');

                                                           ?>

                                                           
      </div>
         <?php

                      $block = module_invoke('block', 'block_view', '39');
                      print render($block['content']);
                  
   
        ?>
    
         
    
    </div>
</section>
<section class="bottom-white-calendar">
    <div class="container">
         <?php print render($page['graysectioncontent']); ?>
    </div>
</section>
</div>
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