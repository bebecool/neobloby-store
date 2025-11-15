"use client"

import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { useActionState } from "react"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)
  const { t } = useTranslation()

  // TODO: Add support for password updates
  const [state, formAction] = useActionState((() => {}) as any, {
    customer,
    success: false,
    error: null,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label={t('account.password')}
        currentInfo={
          <span>{t('account.passwordHidden')}</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error ?? undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('account.oldPassword')}
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
          />
          <Input
            label={t('account.newPassword')}
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
          />
          <Input
            label={t('account.confirmPassword')}
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
