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
   <div class="white">
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
      <div class="row">
            <div class="col xl9 l8 m7 s12 lightgraybk">
    <section class="main" role="main">
      
<div class="white">
      <?php print render($page['content']); ?>
</div>
      <?php if (!empty($page['graysectioncontent'])): ?>
          
      <div class="section lightgraybk">
          <div class="container">

               <?php print render($page['graysectioncontent']); ?>
          </div>
      </div>
      <?php endif; ?>



    </section>
   
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
         </div><!-- container-->
    </div><!-- row-->

          <?php if (!empty($page['sidebar_second'])): ?>
   
      <aside class="col xl3 l4 m12 s12 sidebar-last" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->

    <?php endif; ?>
 
</div>
<div class="row">
    

   <?php if (!empty($action_links)): ?>
        <div class="action-links"><i class="mdi-action-note-add small"></i><?php print render($action_links); ?></div>
      <?php endif; ?>
    <?php if (!empty($tabs['#primary'])): ?>
          <?php print render($tabs_primary); ?>
      <?php endif; ?>

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