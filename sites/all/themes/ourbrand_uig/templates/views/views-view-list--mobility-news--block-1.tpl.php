<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<div class="m-news">
	<div class="mck-wrap"> 
		<h3 class="dark-grey center"><?php print $view->human_name; ?></h3>
        	<hr>
        <!--        CAROUSEL-->
        <div class="mck-carousel">
  			<ul class="mck-carousel-wrap">
		    	<?php foreach ($rows as $id => $row): ?>
		      		<li class="<?php print $classes_array[$id]; ?>">
		      			<a href="#">
		      				<?php print $row; ?>
		      			</a>
		      		</li>
		    	<?php endforeach; ?>

			<div class="mck-carousel__navigation">
			    <a class="left purple-bg" href="#" data-mck-carousel-prev=""><span class="mck-icon__arrow-left"></span></a>
			    <a class="right purple-bg" href="#" data-mck-carousel-next=""><span class="mck-icon__arrow-right"></span></a>
			</div>
			

	<!--        Carousel END-->
	</div>
</div>