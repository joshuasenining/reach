<?php

/**
 * @file
 * Default theme implementation for comments.
 *
 * Available variables:
 * - $author: Comment author. Can be link or plain text.
 * - $content: An array of comment items. Use render($content) to print them all, or
 *   print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $created: Formatted date and time for when the comment was created.
 *   Preprocess functions can reformat it by calling format_date() with the
 *   desired parameters on the $comment->created variable.
 * - $changed: Formatted date and time for when the comment was last changed.
 *   Preprocess functions can reformat it by calling format_date() with the
 *   desired parameters on the $comment->changed variable.
 * - $new: New comment marker.
 * - $permalink: Comment permalink.
 * - $submitted: Submission information created from $author and $created during
 *   template_preprocess_comment().
 * - $picture: Authors picture.
 * - $signature: Authors signature.
 * - $status: Comment status. Possible values are:
 *   comment-unpublished, comment-published or comment-preview.
 * - $title: Linked title.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - comment: The current template type, i.e., "theming hook".
 *   - comment-by-anonymous: Comment by an unregistered user.
 *   - comment-by-node-author: Comment by the author of the parent node.
 *   - comment-preview: When previewing a new or edited comment.
 *   The following applies only to viewers who are registered users:
 *   - comment-unpublished: An unpublished comment visible only to administrators.
 *   - comment-by-viewer: Comment by the user currently viewing the page.
 *   - comment-new: New comment since last the visit.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * These two variables are provided for context:
 * - $comment: Full comment object.
 * - $node: Node object the comments are attached to.
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_comment()
 * @see template_process()
 * @see theme_comment()
 *
 * @ingroup themeable
 */
?>
<!-- Comment -->
<div class="mck-news-feed-item">

  <div class="mck-content-bar">
    <a href="<?php print $user_url; ?>" class="user-view-profile">
      <?php print $picture ?>
      <div class="mck-content-bar__summary">
        <h5 class="mck-content-bar__title"><?php print $author; ?></h5>
        <?php if($designation || $location): ?>
          <ul class="mck-list--small">
            <?php if($designation): ?><li><?php print $designation; ?></li><?php endif; ?>
            <?php if($location): ?><li><?php print $location; ?></li><?php endif; ?>
          </ul>
        <?php endif; ?>
      </div>
    </a>
  </div>

  <div class="mck-comment">
    
    <?php if($image): ?>
      <div class="mck-comment__image">
          <?php print $image; ?>
      </div>
    <?php endif; ?>
    
    <?php if($file): ?>
      <div class="mck-comment__icon">
        <span class="mck-icon__file"><?php print $file; ?></span>
      </div>
    <?php endif; ?>
    
    <?php if($media || $media_details): ?>
      <div class="mck-comment mck-comment--media-player">
        <?php if($media): ?>
          <div class="mck-comment__video">
            <?php print $media; ?>
          </div>
        <?php endif; ?>
        <?php if($media_details): ?>
          <div class="mck-comment__video-details">
            <?php print $media_details; ?>
          </div>
        <?php endif; ?>
      </div>
    <?php endif; ?>
    
    <?php if($comment_content || $subject): ?>
      <div class="mck-comment__summary">
         <?php if($subject) :?> <h5><?php print $subject; ?></h5> <?php endif; ?>
        <?php
          // We hide the comments and links now, so that we can render them later.
          hide($content);
          print render($comment_content);
        ?>
      </div>
    <?php endif; ?>
  </div>
  
  <!-- <div class="mck-content-meta"> <?php //print render($content['links']) ?> </div> -->
  
  <?php if($changed): ?>
    <div class="mck-content-meta">
      <ul class="mck-content-indicators">
        <li class="mck-content-indicators__time-ago small"><?php print $changed; ?></li>
        <!-- 
        <li class="mck-content-indicators__favorites small"><a href="#"><span class="mck-icon__heart"></span></a></li>
        <li class="mck-content-indicators__comments small"><a href="#"><span class="mck-icon__comment"></span></a></li>
        <li class="mck-content-indicators--has-dropdown small"><a href="#">More <span class="mck-icon__carrot-down"></span></a></li> -->
      </ul>
    </div>
  <?php endif; ?>
  
</div>