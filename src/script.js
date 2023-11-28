import { useState } from 'react'
import { registerBlockType } from '@wordpress/blocks'
import { CheckboxControl , Modal, Button } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch'

registerBlockType('partner-list/partner-list', {
  title: 'Lista de Parceiros',
  category: 'widgets',
  icon: 'groups',
  attributes: {
    selectedPartners: {
      type: 'array',
      default: [],
      validate: (value) => {
        if (!Array.isArray(value)) {
          return 'Parceiros selecionados deve ser um array.'
        }
      }
    },
    partners: {
      type: 'array',
      default: [],
    },
    isModalOpen: {
      type: 'boolean',
      default: false,
    },
    isDataLoaded: {
      type: 'boolean',
      default: false,
    }
  },
  edit: async ({attributes, setAttributes}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const selectedPartners = attributes.selectedPartners

    function onChangePartner(newSelectedPartners) {
      setAttributes({partners: newSelectedPartners})
    }

    function openModal() {
      setIsModalOpen(true)
    }

    function closeModal() {
      setIsModalOpen(false)
    }

    if (!isDataLoaded) {
      const partnersPayload = await apiFetch({path: 'wp/v2/parceiros?per_page=100'})
      const partners = await partnersPayload.json()

      const ordenatedPartners = partners.filter(partner => Object.keys(partner).length !== 0)

    }
  }
})