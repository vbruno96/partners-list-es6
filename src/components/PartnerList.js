
export function PartnerList({partners, selectedPartners}) {
  return (
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
  )
}