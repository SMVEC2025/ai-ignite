import React from 'react'
import Breadcrumbs from '../../components/common/BreadCrumbs'

function Index() {
  return (
    <>
          <Breadcrumbs
                 items={[
              { label: "Home", href: "/" },
            ]}
            current="Sessions"
            subtitle="Manage your members, invites and slots here."
                />
               
    </>
  )
}

export default Index
