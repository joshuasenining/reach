<div id="wrapper">
  <div id="auth_box" class="login">
    <div id="main">
      
        <h1 id="the_logo">
         <?php print $title; ?>
        </h1>
      

      <div id="twocolumns">
        

        <?php print $messages; ?>
        <br />
        <p>Please enter the e-mail address you use to sign into your account.</p>
        <p>If you're email address is associated with an account in our system, you will be redirected to login page and we will send you instructions on how to set your password.</p>
       
        <?php print render($page['content']); ?>
        
         <div id="bottom_part">
           
         <!--  <div class="password_link">
            <?php //print l(t('Forgot your password?'), 'user/password'); ?>
          </div> -->

          <?php //if (variable_get('user_register')): ?>
         <!--  <div class="register_link">
            <?php //print l(t('Register a new account'), 'user/register'); ?>
          </div> -->
          <?php //endif; ?>

          <!--
          <div class="back_link">
            <a href="<?php print url('<front>'); ?>">&larr; <?php print t('Back'); ?> <?php print $site_name; ?></a>
          </div> -->
          
        </div>
      
      </div>

     
      
    </div>
  </div>
</div>