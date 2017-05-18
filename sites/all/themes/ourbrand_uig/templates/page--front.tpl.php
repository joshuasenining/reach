
<!-- Header -->
<div class="mck-header" data-mck-th-bg-white>
  
  <!-- Search -->
  <?php if($show_search): ?>
    <div class="mck-search">
      <a href="#" class="mck-search__toggle">
        <span class="mck-icon__search"></span>
      </a>
      <?php if ($search_dropdown = render($page['search_dropdown'])): ?>
        <div class="mck-search__content mck-scrollable">
          <div class="mck-search__overlay">
            <?php print $search_dropdown; ?>
          </div>
        </div>
      <?php endif; ?>
    </div>
  <?php endif; ?>
  <!-- Search end -->


  <div class="mck-header__details">
    <?php print $header_logo; ?>
    <?php print $sitename; ?>
    <a href="#" class="mck-header__expand-close mck-icon__x" data-mck-header-close></a>
  </div>

  <!-- Main navigation -->
  <?php print $main_menu; ?>
  <?php print $main_menu_desktop; ?>

  <!-- Main navigation end -->

  <!-- Launcher and profile -->
  <?php if($show_launcher || $show_profile): ?>
    <div class="mck-header__sub">
        <!-- App launcher -->
         <?php if($show_launcher): ?>
            <div class="mck-app-launcher">
              <a href="#" class="mck-app-launcher__toggle">
                <span class="mck-icon__grid"></span> 
                <span class="mck-app-launcher__title"><?php print t("Your Apps"); ?></span>
              </a>
              <?php if ($applauncher = render($page['applauncher'])): ?>
                <div class="mck-app-launcher__content"><?php print $applauncher; ?></div>
              <?php endif; ?>
          </div>
        <?php endif; ?> 
        <!-- App launcher end -->
        <!-- Profile -->
         <?php if($show_profile && user_is_logged_in()): ?>
            <div class="mck-profile-dropdown">
              <a href="#" data-mck-profile-toggle="">
                <div class="mck-profile-dropdown__img">
                  <img src="<?php print $user_picture; ?>" />
                </div>
                <span><?php print t("Your Profile"); ?></span>
              </a>
              <?php if ($profile_dropdown = render($page['profile_dropdown'])): ?>
                <div class="mck-profile-dropdown__content"><?php print $profile_dropdown; ?></div>
              <?php endif; ?>
          </div>
        <?php endif; ?> 
        <!-- Profile end -->  
    </div>
  <?php endif; ?>  
  <!-- Launcher and profile end -->
  <!-- Newsletter signup -->
  <div class="header-newsletter-wrap">
      <div class="header-newsletter">
        <strong>Subscribe</strong>
        <div class="newsletter">
          <input type="text" placeholder="email addresss" />
          <input type="submit" class="btn" value="Submit">
          <p class="serif">Join our mobility interest list #OnTheMove</p>
        </div>
      </div>
    </div>
<!-- Newsletter signup -->
</div>
</div>
<!-- Header end -->


<?php print $messages; ?>

<!-- Main Content -->
<div class="<?php print $wrapper_class; ?>">


  

  <?php if($show_breadcrumb): ?>
    <?php print $breadcrumb; ?>
  <?php endif; ?>
  <!-- basic elements -->

  <!-- content top -->
  <?php if ($content_top = render($page['content_top'])): ?>
    <div class="content-top" id="content-top-wrapper"> <?php print $content_top; ?> </div>
  <?php endif; ?>
  <!-- content top -->

  <!-- columns -->
  <div class="<?php print $inwrapper; ?>">

    <?php if($sidebar_first = render($page['sidebar_first'])): ?>
      <div class="mck-sidebar col--first">
        <?php print $sidebar_first; ?>
      </div>
    <?php endif; ?>

    <div class="<?php print $center_class; ?>">
      
       <?php if($highlighted = render($page['highlighted'])): ?>
        <?php print $highlighted; ?>
      <?php endif; ?>
      
      <?php if ($content = render($page['content'])): ?>
          <?php print $content; ?>
      <?php endif; ?>

    </div>

    <?php if($sidebar_second = render($page['sidebar_second'])): ?>
      <div class="mck-sidebar col--end">
        <?php print $sidebar_second; ?>
      </div>
    <?php endif; ?>
    
  </div>
  <!-- columns -->

  <!-- content bottom -->
  <?php if ($content_bottom = render($page['content_bottom'])): ?>
    <div class="content-bottom" id="content-bottom-wrapper"> <?php print $content_bottom; ?> </div>
  <?php endif; ?>
  <!-- content bottom -->

</div>

  <!-- basic elements
  <?php if ($tabs = render($tabs)): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
  <?php if ($action_links = render($action_links)): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>

 -->

<!-- footer -->

  <?php //print $footer_logo;
    
    if($footer = render($page['footer'])): ?>
    
        <?php print $footer; ?>
     
    <?php endif; ?>
    
  <?php /*$block = block_load('ourbrand_blocks', 'footer_info');      
$output = drupal_render(_block_get_renderable_array(_block_render_blocks(array($block))));        
print $output; */?>

<!-- footer -->

<?php if($backto_top) {print $backto_top;} ?>


<div class="mck-search__content mck-scrollable"><div class="mck-search__overlay">

<?php 

print $search_form;


?>

  

</div>