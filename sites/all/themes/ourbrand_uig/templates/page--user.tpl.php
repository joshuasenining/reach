<?php
    $base_url = variable_get('base_url', '');
    if (strpos($messages,"Further instructions have been sent to your e-mail address.") !== false) {
      //print "adasdasdsa";
       //header("Location: http://dev-clientit-lx02.amdc.mckinsey.com/ourbrand");
        ?>
        <script type="text/javascript">
          redirectvar = '<?php echo $base_url ;?>';
          window.top.location.href = redirectvar; 

        </script>
        <?php
        //die();
    }
?>

<div id="wrapper">
  <div id="auth_box" class="login">
    
    
     <?php print $messages; 
      if (strpos($messages,"Further instructions have been sent to your e-mail address.") === false) {
     ?>
    <div id="main">
      
        <h1 id="the_logo">
         <?php print "Sign in"; ?>
        </h1>
      

      <div id="twocolumns">
        

       

       
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
    <?php
  }
  ?>
  </div>
</div>