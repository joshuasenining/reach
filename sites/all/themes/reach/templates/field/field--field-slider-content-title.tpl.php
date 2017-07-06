<?php foreach ($items as $delta => $item): ?>
    <div class="card-content">
    <h2 class="section-title"><?php print render($item); ?></h2>
    </div>
<?php endforeach; ?>