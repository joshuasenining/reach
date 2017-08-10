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
  <?php if (!empty($page['header'])): ?>
    <div class="top">
      <?php print render($page['header']); ?>
    </div>
  <?php endif; ?><!-- /.header  -->

  <div class="row page">


    <section class="main" role="main">
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
      <?php if (!empty($action_links)): ?>
        <div class="action-links"><i class="mdi-action-note-add small"></i><?php print render($action_links); ?></div>
      <?php endif; ?>
      <?php print render($tabs_secondary); ?>
      <?php print render($page['content']); ?>
    </section>
      <?php if (!empty($tabs['#primary'])): ?>
          <?php print render($tabs_primary); ?>
      <?php endif; ?>
    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="<?php print $sidebar_right; ?> sidebar-last" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>
  </div> <!-- /main  -->


    <div class="divider"></div>
      <footer class="page-footer">

          <div class="footer-copyright">
              <div class="container">
                  <span class="brand-logo"><img src="sites/all/themes/reach/images/logo-main-fff.svg">"></span>

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
