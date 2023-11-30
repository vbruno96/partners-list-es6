<?
/**
 * @param array   $atributes
 * @param string  $content
 * @param WP_Block
 */
?>

<div <?= wp_kses_data(get_block_wrapper_attributes()); ?>>
  <? 
    if (isset($atributes)) {
      echo wp_kses_post($atributes);
    }
  ?>
</div>
