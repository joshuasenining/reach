<?php
    // split the username and password so we can put the form links were we want (they are in the "user-login-links" div bellow)
    print drupal_render($form['name']);
    print drupal_render($form['pass']);
    ?>
     <!--  <div class="form-item form-type-password form-item-pass">
        <label for="edit-pass">Password 
            <span class="form-required" title="This field is required.">*</span>
            <a class="floatright normal-font" href="<?php print $base_url;?>/user/password?width=500&height=280&iframe=true" title="Forgot your password?" class="colorbox">Forgot your password?</a>
        </label> 
        <input type="password" id="edit-pass" name="pass" size="60" maxlength="128" class="form-text required">
        <div class="description">Enter the password that accompanies your e-mail.</div>
    </div> -->
    
    
    
   <!--  <div class="user-login-links">
  <span class="password-link"><a href="/user/password">Forget your password?</a></span> | <span class="register-link"><a href="/user/register">Create an account</a></span>
    </div> -->


    <?php
        // render login button
    print drupal_render($form['form_build_id']);
    print drupal_render($form['form_id']);
    print drupal_render($form['actions']);
?>