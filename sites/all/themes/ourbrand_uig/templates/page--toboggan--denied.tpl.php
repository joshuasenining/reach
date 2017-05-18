<div id="wrapper">
  <div id="auth_box" class="login">
    <div id="main">
      
        <h1 id="the_logo">
         <?php print $title; ?>
        </h1>
      

      <div id="twocolumns">
        

        <?php //print $messages; ?>
        
        <?php print render($page['content']); ?>
        
        <br />
         <div id="bottom_part">
           
          <div class="password_link floatleft">
            <?php //rint l(t('Forgot your password?'), 'user/password'); ?>
             <a href="user/password?width=500&height=280&iframe=true" title="Forgot your password?" class="colorbox-load">Forgot your password?</a>
          </div>

          <?php if (variable_get('user_register')): ?>
          <div class="register_link floatright">
            <?php print "Don't have an account? ";//.l(t('Request credentials.'), 'user/register') ?>
            <a href="request-access?width=500&height=280&iframe=true" title="Request access" class="colorbox-load">Request credentials</a>
          </div>
          <?php endif; ?>

          <!--
          <div class="back_link">
            <a href="<?php print url('<front>'); ?>">&larr; <?php print t('Back'); ?> <?php print $site_name; ?></a>
          </div> -->
          
        </div>
      
      </div>

     
      
    </div>
  </div>
</div>