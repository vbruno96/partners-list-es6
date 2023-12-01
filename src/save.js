import { useBlockProps } from '@wordpress/block-editor'

export function save({attributes: { selectedPartners, partners }}) {
  return (
    <div {...useBlockProps.save({ className: 'wp-block-partner-list-partner-list' })}>
      {
        partners.map((partner) => {
          if (selectedPartners.find((partnerId) => partner === partnerId)) {
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

          return
        })
      }
    </div>
  )
}