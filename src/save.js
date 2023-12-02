import { useBlockProps } from '@wordpress/block-editor'

export function save({attributes: { selectedPartners, partners }}) {
  return (
    <div {...useBlockProps.save({className: 'custom-block-partners-list'})}>
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
  )
}