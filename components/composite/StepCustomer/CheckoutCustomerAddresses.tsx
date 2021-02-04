import { AddressCollection } from "@commercelayer/js-sdk"
import {
  AddressesContainer,
  BillingAddressForm,
  SaveAddressesButton,
  ShippingAddressForm,
  CustomerContainer,
  BillingAddressContainer,
  Address,
  AddressField,
  ShippingAddressContainer,
} from "@commercelayer/react-components"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, Fragment, useEffect } from "react"
import styled from "styled-components"
import tw from "twin.macro"

import { useTranslation } from "components/data/i18n"
import { ButtonCss } from "components/ui/Button"
import { Toggle } from "components/ui/Toggle"

import { AddressButtonAddNew } from "./AddressButtonAddNew"
import { AddressSectionEmail } from "./AddressSectionEmail"
import { AddressSectionSaveForm } from "./AddressSectionSaveForm"
import { AddressSectionSaveOnAddressBook } from "./AddressSectionSaveOnAddressBook"
import { AddressSectionTitle } from "./AddressSectionTitle"
import { BillingAddressFormNew } from "./BillingAddressFormNew"
import { ShippingAddressFormNew } from "./ShippingAddressFormNew"

interface Props {
  billingAddress: AddressCollection | null
  shippingAddress: AddressCollection | null
  hasSameAddresses: boolean
  isUsingNewBillingAddress: boolean
  isUsingNewShippingAddress: boolean
  hasCustomerAddresses: boolean
  isGuest: boolean
  emailAddress: string
  refetchOrder: () => void
}

export const CheckoutCustomerAddresses: React.FC<Props> = ({
  billingAddress,
  shippingAddress,
  isUsingNewBillingAddress,
  isUsingNewShippingAddress,
  hasSameAddresses,
  hasCustomerAddresses,
  isGuest,
  emailAddress,
  refetchOrder,
}: Props) => {
  const { t } = useTranslation()

  const [
    billingAddressFill,
    setBillingAddressFill,
  ] = useState<AddressCollection | null>(billingAddress)
  const [
    shippingAddressFill,
    setShippingAddressFill,
  ] = useState<AddressCollection | null>(shippingAddress)

  const [shipToDifferentAddress, setShipToDifferentAddress] = useState<boolean>(
    !hasSameAddresses
  )

  const [showBillingAddressForm, setShowBillingAddressForm] = useState<boolean>(
    isUsingNewBillingAddress
  )
  const [
    showShippingAddressForm,
    setShowShippingAddressForm,
  ] = useState<boolean>(isUsingNewShippingAddress)

  const handleShowBillingForm = () => [
    setShowBillingAddressForm(!showBillingAddressForm),
    setShippingAddressFill(null),
  ]
  const handleShowShippingForm = () => [
    setShowShippingAddressForm(!showShippingAddressForm),
    setShippingAddressFill(null),
  ]

  useEffect(() => {
    if (showBillingAddressForm && hasCustomerAddresses) {
      setBillingAddressFill(null)
    }
    if (showShippingAddressForm && hasCustomerAddresses) {
      setShippingAddressFill(null)
    }
  }, [showBillingAddressForm, showShippingAddressForm])

  return (
    <Fragment>
      <AddressSectionEmail isGuest={isGuest} emailAddress={emailAddress} />
      <CustomerContainer>
        <AddressesContainer shipToDifferentAddress={shipToDifferentAddress}>
          <AddressSectionTitle>
            {t(`addressForm.billing_address_title`)}
          </AddressSectionTitle>
          <BillingAddressContainer>
            <AddressCardComponent
              addressType="billing"
              onSelect={() => setShowBillingAddressForm(false)}
            />
          </BillingAddressContainer>
          {!showBillingAddressForm && hasCustomerAddresses && (
            <button
              tw="w-1/2 p-2 mb-5 text-left border rounded cursor-pointer hover:border-blue-500 shadow-sm"
              onClick={handleShowBillingForm}
            >
              <FontAwesomeIcon icon={faPlus} tw="mr-3" />
              {shipToDifferentAddress
                ? "Add new billing address"
                : "Add new address"}
            </button>
          )}
          {showBillingAddressForm || !hasCustomerAddresses ? (
            <BillingAddressForm autoComplete="on" className="p-2">
              <BillingAddressFormNew billingAddress={billingAddressFill} />
              <AddressSectionSaveOnAddressBook addressType="billing" />
            </BillingAddressForm>
          ) : null}
          <Toggle
            data-cy="button-ship-to-different-address"
            data-status={shipToDifferentAddress}
            label={t(`addressForm.ship_to_different_address`)}
            checked={shipToDifferentAddress}
            onChange={() => [
              setShipToDifferentAddress(!shipToDifferentAddress),
              setShippingAddressFill(null),
            ]}
          />
          {shipToDifferentAddress && hasCustomerAddresses ? (
            <Fragment>
              <ShippingAddressContainer>
                <div tw="pl-2 pt-4">
                  <AddressSectionTitle>
                    {t(`addressForm.shipping_address_title`)}
                  </AddressSectionTitle>
                </div>

                <AddressCardComponent
                  addressType="shipping"
                  onSelect={() => setShowShippingAddressForm(false)}
                />
              </ShippingAddressContainer>

              {!showShippingAddressForm && hasCustomerAddresses ? (
                <button
                  tw="w-1/2 p-2 mb-5 text-left border rounded cursor-pointer hover:border-blue-500 shadow-sm"
                  onClick={handleShowShippingForm}
                >
                  <FontAwesomeIcon icon={faPlus} tw="mr-3" />
                  Add new shipping address
                </button>
              ) : null}
            </Fragment>
          ) : (
            <Fragment />
          )}
          {showShippingAddressForm || !hasCustomerAddresses ? (
            <>
              {shipToDifferentAddress && (
                <ShippingAddressForm
                  autoComplete="on"
                  hidden={!shipToDifferentAddress}
                  className="p-2"
                >
                  <ShippingAddressFormNew
                    shippingAddress={shippingAddressFill}
                  />

                  <AddressSectionSaveOnAddressBook addressType="shipping" />
                </ShippingAddressForm>
              )}
            </>
          ) : null}

          <div tw="flex justify-between">
            <div>
              {(showBillingAddressForm && !isUsingNewBillingAddress) ||
              (showShippingAddressForm && !isUsingNewShippingAddress) ? (
                <AddressButtonAddNew
                  onClick={() => {
                    setShowBillingAddressForm(isUsingNewBillingAddress)
                    setShowShippingAddressForm(isUsingNewShippingAddress)
                  }}
                >
                  Discard changes
                </AddressButtonAddNew>
              ) : null}
            </div>
            <AddressSectionSaveForm>
              <StyledSaveAddressesButton
                label={t("stepCustomer.continueToDelivery")}
                data-cy="save-addresses-button"
                onClick={refetchOrder}
              />
            </AddressSectionSaveForm>
          </div>
        </AddressesContainer>
      </CustomerContainer>
    </Fragment>
  )
}

interface AddressCardProps {
  addressType: "shipping" | "billing"
  onSelect: () => void
}

const AddressCardComponent: React.FC<AddressCardProps> = ({
  addressType,
  onSelect,
}) => {
  const dataCy =
    addressType === "billing"
      ? "customer-billing-address"
      : "customer-shipping-address"
  return (
    <AddressCard
      data-cy={dataCy}
      selectedClassName="border-blue-500"
      onSelect={onSelect}
    >
      <div tw="flex font-bold">
        <AddressField name="first_name" />
        <AddressField name="last_name" tw="ml-1" />
      </div>
      <div>
        <AddressField name="full_address" />
      </div>
    </AddressCard>
  )
}

const AddressCard = styled(Address)`
  ${tw`w-1/2 p-2 mb-5 border rounded cursor-pointer hover:border-blue-500 shadow-sm`}
`

const StyledSaveAddressesButton = styled(SaveAddressesButton)`
  ${ButtonCss}
`
