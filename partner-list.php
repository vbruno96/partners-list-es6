<?
/**
 * Plugin Name: Lista de Parceiros
 * Description: Bloco personalizado com a lista de parceiros.
 * Author: Bruno Marques
 * Version: 1.0.0
 * 
 */

 function register_custom_partner_list_block() {
  register_block_type(__DIR__ . '/build');
 }

 add_action( 'init',  'register_custom_partner_list_block');