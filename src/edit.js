import { useState, useEffect } from '@wordpress/element'
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
                linkUrl: partner.acf.site_parceiro
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

export function edit({attributes: { selectedPartners, partners }, setAttributes}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)

    useEffect(() => {
      setIsDataLoading(true)
      loadData()
        .then((partners) => setAttributes({ partners }))
        .finally(() => setIsDataLoading(false))
    }, [])

    function onChangePartner(newSelectedPartners) {
      setAttributes({selectedPartners: newSelectedPartners})
    }

    function openModal() {
      setIsModalOpen(true)
    }

    function closeModal() {
      setIsModalOpen(false)
    }

    function handleToogleCheckbox(isChecked, partnerId) {
      isChecked 
        ? onChangePartner([...selectedPartners, partnerId])
        : onChangePartner(selectedPartners.filter((id) => id !== partnerId))
    }

    return (
      <div {...useBlockProps()}>
      <Button
            variant='primary'
            onClick={openModal}
          >
          Selecionar Parceiros
        </Button>
        {
          selectedPartners.length > 0 &&
          <div className='partners-list'>
            {
              partners.map((partner) => {
                if (selectedPartners.includes(partner.value)) {
                  return (
                    <a
                      key={partner.value}
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
              : partners.map((partner) => {
                
                return <CheckboxControl
                  key={partner.value}
                  label={partner.label}
                  checked={selectedPartners.includes(partner.value)}
                  onChange={(isChecked) => {
                    handleToogleCheckbox(isChecked, partner.value)
                  }}
                /> 
              })
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