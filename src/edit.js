import { useState } from '@wordpress/element'
import { CheckboxControl , Modal, Button, Spinner } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor'
import apiFetch from '@wordpress/api-fetch'

async function loadData() {  
  try {
    const partners = await apiFetch({path: 'wp/v2/partners?per_page=100'})

    return await partners.reduce(async (_acc, partner) => {
      const acc = await _acc
        
      try {
        const image = await apiFetch({path: `wp/v2/media/${partner.featured_media}`})

        return [
            ...acc,
            {
                value: partner.id.toString(),
                label: partner.title.rendered,
                imageSrc: image.guid.rendered,
                linkUrl: partner.acf.partner_landing_page
            }
        ].sort((x, y) => x.label.toLowerCase().localeCompare(y.label.toLowerCase()))
      } catch (error) {
        console.error('Erro ao obter as imagens dos parceiros:', error)
      }

    }, Promise.resolve([]))

  } catch (error) {
    console.error('Erro ao obter a lista de parceiros:', error)
  }
}

export function edit({attributes, setAttributes}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [selectedPartners, setSelectedPartners] = useState(attributes.selectedPartners)

    function onChangePartner(newSelectedPartners) {
      setAttributes({selectedPartners: newSelectedPartners})
    }

    function openModal() {
      setIsModalOpen(true)
    }

    function closeModal() {
      setIsModalOpen(false)
      onChangePartner(selectedPartners)
    }

    function handleToogleCheckbox(isChecked, partnerId) {
      isChecked 
        ? setSelectedPartners((prevSelected) => [...prevSelected, partnerId])
        : setSelectedPartners((selected) => selected.filter((id) => id !== partnerId))

      onChangePartner(selectedPartners)
    }

    if (!isDataLoaded) {
      loadData().then((partnersOrdered) => {
        setIsDataLoading(true)
        setIsDataLoaded(true)
        setAttributes({ partners: partnersOrdered, isDataLoaded: true })
      }).then(() => setIsDataLoading(false))
      
    }

    return (
      <>
      <div {...useBlockProps()}>
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
                attributes.partners.find((partner) => {
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

                  return <p>{selectedPartners.length}</p>
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
              isDataLoading
              ? <Spinner />
              : attributes.partners.map((partner) => {
                
                return <CheckboxControl
                  key={partner.value}
                  label={partner.label}
                  checked={selectedPartners.includes(partner.value)}
                  onChange={(isChecked) => handleToogleCheckbox(isChecked, partner.value)}
                /> 
              })
            }
            <p>{JSON.stringify(selectedPartners)}</p>
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
      </>
    )
    
}