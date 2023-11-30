import { useState } from 'react'
import { CheckboxControl , Modal, Button } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch'

export async function edit({attributes, setAttributes}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [selectedPartners, setSelectedPartners] = useState(attributes.selectedPartners)

    function onChangePartner(newSelectedPartners) {
      setAttributes({partners: newSelectedPartners})
    }

    function openModal() {
      setIsModalOpen(true)
    }

    function closeModal() {
      setIsModalOpen(false)
    }

    function handleToogleCheckbox(isChecked, partnerId) {
      isChecked 
        ? setSelectedPartners((prevSelected) => [...prevSelected, partnerId])
        : setSelectedPartners((selected) => selected.filter((id) => id !== partnerId))

      onChangePartner(selectedPartners)
    }

    let partnersOrdered = []

    if (!isDataLoaded) {
      try {
        const partners = await apiFetch({path: 'wp/v2/parceiros?per_page=100'})

        partnersOrdered = await partners.reduce(async (_acc, partner) => {
          const acc = await _acc
          
          try {
            const mediaPayload = await fetch(partner._links['wp:featuredmedia'][0].href)
            const image = await mediaPayload.json()
            return [
                ...acc,
                {
                    value: partner.id.toString(),
                    label: partner.title.rendered,
                    imageSrc: image.guid.rendered,
                    linkUrl: partner.acf.partner_landing_page
                }
            ].sort((x, y) => x.name.toLowerCase().localeCompare(y.name.toLowerCase()))
          } catch (error) {
            console.error('Erro ao obter as imagens dos parceiros:', error)
          }

        }, Promise.resolve([]))
      } catch (error) {
        console.error('Erro ao obter a lista de parceiros:', error)
      }

      setAttributes({ partners: partnersOrdered })
      setIsDataLoaded(true)

      return (
        <div>
          <Button
            variant='primary'
            onClick={openModal}
          >
            Selecionar Parceiros
          </Button>
          {
            selectedPartners.length > 0 &&
            <div className="partners-list">
              {
                selectedPartners.map((partnerId) => {
                  partnersOrdered.find((partner) => {
                    if (partner.value === partnerId) {
                      return (
                        <a 
                          href={partner.linkUrl}
                          className="partner"
                        >
                          <img
                            src={partner.imageSrc}
                            alt={partner.label}
                          />
                        </a>
                      )
                    }
                  })
                })
              }
            </div>
          }
          {
            isModalOpen &&
            <Modal 
              className='partner-list-modal'
              title='Selecionar os parceiros'
              shouldCloseOnClickOutside
              onRequestClose={closeModal}
            >
              {
                partnersOrdered.map((partner) => (
                  <CheckboxControl
                    key={partner.value}
                    label={partner.label}
                    checked={selectedPartners.includes(partner.value)}
                    onChange={(isChecked) => handleToogleCheckbox(isChecked, partner.value)}
                  /> 
                ))
              }
              <div className="partner-list-modal-footer">
                <Button
                  variant='primary'
                  onClick={closeModal}
                >
                  Salvar
                </Button>
              </div>
            </Modal>
          }
        </div>
      )

    }
}