import { useBlockProps } from '@wordpress/block-editor'
import { PartnerList } from './components/PartnerList'

export function save({attributes: { selectedPartners, partners }}) {
  return (
    <div {...useBlockProps.save({className: 'custom-block-partners-list'})}>
      <PartnerList
        partners={partners}
        selectedPartners={selectedPartners}
      />
    </div>
  )
}