<?php
/**
 * @file
 */


/**
 * Implements hook_theme()
 *
 * @param $existing
 * @param $type
 * @param $theme
 * @param $path
 *
 * @see http://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_theme/7
 */
function mck_uig_theme($existing, $type, $theme, $path) {
  return array(
    'menubar' => array(
      'render element' => 'element',
    ),
  );
}



/**
 * Returns HTML for a breadcrumb trail.
 * theme_breadcrumb
 */
function mck_uig_breadcrumb($vars) {
  $breadcrumb = $vars['breadcrumb'];

  // Remove the rather pointless breadcrumbs for reset password and user
  // register pages, they link to the page you are on, doh!
  if (arg(0) === 'user' && (arg(1) === 'password' || arg(1) === 'register')) {
    array_pop($breadcrumb);
  }

  if (!empty($breadcrumb)) {

    // Push the page title onto the end of the breadcrumb array
    if ($page_title = drupal_get_title()) {
      $breadcrumb[] = '<span class="crumb-title">' . $page_title . '</span>';
    }

    $class = 'crumb';
    end($breadcrumb);
    $last = key($breadcrumb);

    $output = '';
    $output .= '<ul id="crumbs" class="mck-list--breadcrumbs">';
    foreach ($breadcrumb as $key => $crumb) {
      if ($key == $last && count($breadcrumb) != 1) {
        $class = 'crumb crumb-last';
      }
      if ($key == 0) {
        $output .= '<li class="' . $class . ' crumb-first">' . $crumb . '</li>';
      }
      else {
        $output .= '<li class="' . $class . '"><span class="crumb-separator"> >> </span>' . $crumb . '</li>';
      }
    }
    $output .= '</ul>';

    return $output;
  }
}



/**
 * Returns HTML for status and/or error messages, grouped by type.
 *
 * Adaptivetheme adds a div wrapper with CSS id.
 *
 * An invisible heading identifies the messages for assistive technology.
 * Sighted users see a colored box. See http://www.w3.org/TR/WCAG-TECHS/H69.html
 * for info.
 *
 * @param $vars
 *   An associative array containing:
 *   - display: (optional) Set to 'status' or 'error' to display only messages
 *     of that type.
 */
function mck_uig_status_messages($vars) {
  $display = drupal_get_messages($vars['display']);
  $output = '';
  $error = '';
  $status = '';

  if (count($display) > 0) {
    foreach ($display as $type => $messages) {
      if($type == 'error' || $type == 'warning') {
        foreach ($messages as $message) {
          $error .= '  <p class="mck-alert__desc small"><span class="mck-alert__icon mck-icon__alert"></span>' . $message . "</p>";
        }
        $output .= "<div class='mck-alert mck-alert-important' data-mck-dismissable>";
        $output .= $error;
        $output .= "<a href='#'' class='mck-alert__close mck-icon__x' data-mck-dismiss=''></a></div>";
      }
      if($type == 'status') {
        foreach ($messages as $message) {
          $status .= '  <p class="mck-alert__desc small"><span class="mck-alert__icon  mck-icon__info"></span>' . $message . "</p>";
        }
        $output .= "<div class='mck-alert mck-alert-info' data-mck-dismissable>";
        $output .= $status;
        $output .= "<a href='#'' class='mck-alert__close mck-icon__x' data-mck-dismiss=''></a></div>";
      }
    }

  }
  return $output;
}


/**
 * theme_pager
 */
function mck_uig_pager($variables) {

  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total_items, $pager_total, $pager_limits;


  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  $current_viewed = $pager_current;
  $total = $pager_total_items[$element];

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.


  $page_url = check_plain($_GET['q']);
  
  // prev link
  $prev_classes = 'mck-pagination__ctrl mck-pagination__ctrl--prev is-themed--hover';
  $prev_span = "<span class='mck-icon__arrow-left'></span>";
  if(isset($pager_page_array[0]) && $pager_page_array[0] == 0) {
    $li_previous = '<a href="#" class="' . $prev_classes . ' mck-pagination__ctrl--disabled">' . $prev_span . '</a>';
  } else {
    $prev_query['html'] = true;
    $prev_query['attributes'] =  array("class" => array($prev_classes));
    $page_number = $pager_current-2;
    $prev_query['query'] = array("page" => $pager_current-2);
    if($page_number == 0) {
      unset($prev_query['query']);
    }
    $li_previous = l($prev_span, $page_url, $prev_query);
  }
  // next link
  $next_classes = 'mck-pagination__ctrl mck-pagination__ctrl--next is-themed--hover';
  $next_span = "<span class='mck-icon__arrow-right'></span>";
  if(isset($pager_page_array[0]) && $pager_page_array[0] == $pager_total[0]-1) {
    $li_next = '<a href="#" class="' . $next_classes . ' mck-pagination__ctrl--disabled">' . $next_span . '</a>';
  } else {
    $next_query['html'] = true;
    $next_query['attributes'] =  array("class" => array($next_classes));
    $next_query['query'] = array("page" => $pager_current);
    $li_next = l($next_span, $page_url, $next_query);
  }

  // create pager
  if ($pager_total[$element] > 1) {

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '<a>...</a>',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('is-active'),
            'data' => '<a href="#">' . $i . '</a>',
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '<a>...</a>',
        );
      }
    }
    // End generation.

    $output = "<div class='mck-pagination'>";
    $output .= $li_previous;
    $output .= '<p class="mck-pagination__label mck-bp-hide-medium">' . $current_viewed . ' ' . t("of") .' '. $total . '</p>';
    $output .= theme('item_list', array('items' => $items, 'attributes' => array('class' => array('mck-pagination__list uig-pager'))));
    $output .= $li_next;
    $output .= "</div>";
    return $output;

  }
}


/* 
 * theme_item_list
 */
function mck_uig_item_list($variables) {
  $items = $variables ['items'];
  $title = $variables ['title'];
  $type = $variables ['type'];
  $attributes = $variables ['attributes'];
  $output = '';

  // Only output the list container and title, if there are any list items.
  // Check to see whether the block title exists before adding a header.
  // Empty headers are not semantic and present accessibility challenges.
  //$output = '<div class="item-list">';
  if (isset($title) && $title !== '') {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    $i = 0;
    foreach ($items as $item) {
      $attributes = array();
      $children = array();
      $data = '';
      $i++;
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes [$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        // Render nested list.
        $data .= theme_item_list(array('items' => $children, 'title' => NULL, 'type' => $type, 'attributes' => $attributes));
      }
      if ($i == 1) {
        $attributes ['class'][] = 'first';
      }
      if ($i == $num_items) {
        $attributes ['class'][] = 'last';
      }
      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>\n";
    }
    $output .= "</$type>";
  }
  //$output .= '</div>';
  return $output;
}


/*
 *  theme_username
 */
function mck_uig_username($variables) {
  
}


/*
 *  theme_user_picture
 */
function mck_uig_user_picture($variables) {
  global $base_path;
  $userobj = $variables['user'];
  $picture = '';
  $db_default = variable_get('user_picture_default', '');
  
  // first check if user uploaded photo/know profile if vender id/db default picture/default theme picture
  if (!empty($userobj->picture)) {
    $picture = theme('image_style', array('path' => $userobj->picture->uri, 'style_name' => 'thumbnail'));
  }elseif(isset($userobj->field_person_id['und'][0]['value'])) {
    $person_id = $userobj->field_vendorid['und'][0]['value'];
    $picture = '<img src="http://webassets.intranet.mckinsey.com/person/' . $person_id . '/images/profile.jpg" />';
  }elseif(!empty($db_default)){
    $picture = theme('image_style', array('path' => $db_default, 'style_name' => 'thumbnail'));
  }else {
    $img_path = $base_path . drupal_get_path('theme', 'mck_uig') . '/images/small-default-avatar.png';
    $picture = '<img src="' . $img_path .'" />';
  }
  return $picture;
}