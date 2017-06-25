<?php foreach ($items as $delta => $item): ?>
    <div class="card-content">
    <h5 class="bluetext"><?php print render($item); ?></h5>
    </div>
<?php endforeach; ?>