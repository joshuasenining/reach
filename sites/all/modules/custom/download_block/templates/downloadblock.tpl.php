<?php if($links) {	 ?>
<div class="mck-th-blue-global download-block-wrapper">
<h4>Downloads</h4>
<?php

foreach ($links as $key=>$link) {
	print "<li>" . $link . "<span class=extension>". strtoupper($ext[$key]) . "</span></li>";
}
?>
</div>
<?php } ?>