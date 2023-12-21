import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { c } from './countries'
import { CountrySelector } from './CountrySelector'
import { ICountryList, IFormat, NumberFormatterProps } from '../../../lib/types'
import { compare, getDefaultCountry, getSeperatorsPositions } from '../../../lib/utils'
import { Input } from '../../input'
import { Label } from '../../label'

export const PhoneInput: React.FC<NumberFormatterProps> = (props: NumberFormatterProps) => {
  const [newCountries] = useState<ICountryList[]>([...c].sort(compare))
  const [defaultCountry] = useState<ICountryList>(
    getDefaultCountry(
      newCountries,
      c,
      props.defaultCountry,
      props.onlyCountries,
      String(props.value),
      props.initialFormat,
      props.includeDialingCode,
    ),
  )
  const [countryCode, setCountryCode] = useState<string>(() => {
    if (props.format !== undefined) {
      const { prefix } = getSeperatorsPositions(props.format)
      return prefix
    } else {
      return defaultCountry.d
    }
  })
  const drpButton = useRef<HTMLButtonElement>()
  const list = useRef<HTMLDivElement>()
  const [format, setFormat] = useState<IFormat>({
    format: props.format ? props.format : defaultCountry.f,
    placeholder: props.placeholder ? props.placeholder : defaultCountry.p,
  })
  const [fixedLength] = useState<boolean>(props.fixLength || props.fixLength === undefined ? true : false)
  const inputElm = useRef<HTMLInputElement>()
  const parent = useRef<HTMLDivElement>()
  props.getCountryCode && props.getCountryCode(countryCode)
  useEffect(() => {
    if (props.className && parent.current) {
      parent.current?.classList.add(props.className)
    }
    if (inputElm.current && parent.current) {
      if (drpButton.current && list.current) {
       // onInputFocus(inputElm.current, parent.current, drpButton.current, list.current)
      } else {
       // onInputFocus(inputElm.current, parent.current)
      }
      getRawNumber(inputElm.current.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format])
  useEffect(() => {
    if (props.error && props.error.length && props.error[0] && parent.current) {
      parent.current.classList.add('border-red')
    } else {
      parent.current && parent.current.classList.remove('border-red')
    }
  })
  const ondown = async (key: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    const { seperators, prefixIndexes, prefix, justSymbols } = getSeperatorsPositions(format.format)
    const validKeys = /([0-9]|Backspace|ArrowLeft|ArrowRight|Control|v|c|x)/g
    const validateNumber = /[0-9]/g
    const isValidKey = key.match(validKeys)
    const isValidNumber = key.match(validateNumber)
    const text = window.getSelection()?.toString()
    const addNum = () => {
      if (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) {
        if (!fixedLength) {
          if (text && text?.length) {
            e.currentTarget.setRangeText(
              key,
              e.currentTarget.selectionStart,
              e.currentTarget.selectionStart + text.length,
              'preserve',
            )
            updateNumber(e.currentTarget)
          }
          for (let i = 0; i < seperators.length; i++) {
            if (e.currentTarget.selectionStart === seperators[i].index) {
              e.currentTarget.setRangeText(
                seperators[i].symbol,
                e.currentTarget.selectionStart,
                e.currentTarget.selectionStart + seperators[i].symbol.length,
                'end',
              )
            }
          }
          e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, 'end')
        } else if (e.currentTarget.selectionStart < format.format.length) {
          if (text && text?.length) {
            e.currentTarget.setRangeText(
              key,
              e.currentTarget.selectionStart,
              e.currentTarget.selectionStart + text.length,
              'preserve',
            )
            updateNumber(e.currentTarget)
          }
          for (let i = 0; i < seperators.length; i++) {
            if (e.currentTarget.selectionStart === seperators[i].index) {
              e.currentTarget.setRangeText(
                seperators[i].symbol,
                e.currentTarget.selectionStart,
                e.currentTarget.selectionStart + seperators[i].symbol.length,
                'end',
              )
            }
          }
          e.currentTarget.setRangeText(key, e.currentTarget.selectionStart, e.currentTarget.selectionStart + 1, 'end')
        }
      }
    }

    if (isValidKey) {
      if (key === 'Backspace') {
        if (e.currentTarget.selectionEnd && !prefixIndexes.includes(e.currentTarget.selectionEnd - 1)) {
          if (e.currentTarget.selectionStart && e.currentTarget.selectionStart <= prefix.length) {
            e.currentTarget.selectionStart = prefix.length
          }
          if (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) {
            if (e.currentTarget.selectionStart !== e.currentTarget.selectionEnd) {
              e.currentTarget.setRangeText('', e.currentTarget.selectionStart, e.currentTarget.selectionEnd, 'end')
              updateNumber(e.currentTarget)
            } else {
              e.currentTarget.setRangeText('', e.currentTarget.selectionEnd - 1, e.currentTarget.selectionEnd, 'end')
              updateNumber(e.currentTarget)
            }
            getRawNumber(e.currentTarget.value)
          }
        }
      }
      if (isValidNumber) {
        addNum()
        getRawNumber(e.currentTarget.value)
        e.preventDefault()
      } else if (
        e.currentTarget.selectionEnd &&
        key === 'ArrowLeft' &&
        justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 2]) &&
        e.currentTarget.selectionEnd > prefix.length
      ) {
        e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1
      } else if (e.currentTarget.selectionEnd && key === 'ArrowLeft' && e.currentTarget.selectionEnd < prefix.length) {
        e.preventDefault()
      } else if (
        e.currentTarget.selectionStart &&
        key === 'ArrowRight' &&
        justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionStart + 1]) &&
        e.currentTarget.selectionStart > prefix.length
      ) {
        e.currentTarget.selectionStart = e.currentTarget.selectionStart + 2
      } else if (!e.ctrlKey && !e.metaKey && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }

  const arrangeNumber = (value: string) => {
    let trimmedText = ''
    const { seperators, prefix } = getSeperatorsPositions(format.format)
    if (value && prefix.length && value.includes(prefix)) {
      const slicedValue = value.slice(prefix.length, value.length)
      const slicedDividers = seperators.slice(prefix.length, seperators.length)
      for (let i = 0; i < slicedDividers.length; i++) {
        slicedDividers[i].index = slicedDividers[i].index - prefix.length
      }
      for (let i = 0; i < slicedValue.length; i++) {
        if (
          (Number(slicedValue[i]) && slicedValue[i] !== '+' && slicedValue[i] !== '-' && slicedValue[i] !== '.') ||
          slicedValue[i] === '0'
        ) {
          trimmedText += slicedValue[i]
        }
      }
    } else {
      if (value) {
        for (let i = 0; i < value.length; i++) {
          if ((Number(value[i]) && value[i] !== '+' && value[i] !== '-' && value[i] !== '.') || value[i] === '0') {
            trimmedText += value[i]
          }
        }
      }
    }
    let dividersLength = 0
    for (let i = 0; i < seperators.length; i++) {
      dividersLength += seperators[i].symbol.length
    }
    const slice = fixedLength ? trimmedText.slice(0, format.format.length - dividersLength) : trimmedText
    const split = Array.from(slice)
    return seperateNumbers(split as string[])
  }

  const seperateNumbers = (value: string[]) => {
    const { seperators, prefix } = getSeperatorsPositions(format.format)
    let j = 0
    for (let i = 0; i < value.length; i++) {
      if (seperators[j]) {
        if (i === seperators[j].index) {
          value.splice(seperators[j].index, 0, seperators[j].symbol)
          j++
        }
      }
    }
    let modifiedNumber: string
    if (props.prefix) {
      if (!value.length && prefix) {
        if (prefix[prefix.length] === '(') {
          const val = prefix.slice(0, prefix.length - 1)
          modifiedNumber = val
        } else if (prefix[prefix.length - 1] === '(') {
          const val = prefix.slice(0, prefix.length - 2)
          modifiedNumber = val
        } else {
          modifiedNumber = prefix
        }
      } else {
        modifiedNumber = value.join('')
      }
      return modifiedNumber
    }
    modifiedNumber = value.join('')
    return modifiedNumber
  }
  const getRawNumber = (value: string) => {
    const { seperators, prefix } = getSeperatorsPositions(format.format)
    if (prefix.length && value.includes(prefix)) {
      const slicedValue = value.slice(prefix.length, value.length)
      const slicedDividers = seperators.slice(prefix.length, seperators.length)
      for (let i = 0; i < slicedDividers.length; i++) {
        slicedDividers[i].index = slicedDividers[i].index - prefix.length
      }
      const valAray = Array.from(slicedValue)
      let newValue = ''
      for (let i = 0; i < valAray.length; i++) {
        if (slicedDividers.length) {
          if (i === slicedDividers[0].index) {
            valAray.slice(slicedDividers[0].index, 0)
            slicedDividers.shift()
          } else {
            newValue += valAray[i]
          }
        } else {
          newValue += valAray[i]
        }
      }
      if ((props.includeDialingCode === undefined || props.includeDialingCode) && newValue.length) {
        props.onchange && props.onchange(countryCode.slice(1, countryCode.length) + newValue)
      } else {
        props.onchange && props.onchange(newValue)
      }
    } else {
      const valAray = Array.from(value)
      let newValue = ''
      for (let i = 0; i < valAray.length; i++) {
        if (seperators.length) {
          if (i === seperators[0].index) {
            valAray.slice(seperators[0].index, 0)
            seperators.shift()
          } else {
            newValue += valAray[i]
          }
        } else {
          newValue += valAray[i]
        }
      }
      if ((props.includeDialingCode === undefined || props.includeDialingCode) && newValue.length) {
        props.onchange && props.onchange(countryCode.slice(1, countryCode.length) + newValue)
      } else {
        props.onchange && props.onchange(newValue)
      }
    }
  }
  const onpaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    let start = e.currentTarget.selectionStart as number
    const target = e.currentTarget
    const copiedText = await e.clipboardData.getData('Text')
    const value = copiedText
    const text = window.getSelection()?.toString()
    const { prefix } = getSeperatorsPositions(format.format)
    let trimmedText = ''
    for (let i = 0; i < value.length; i++) {
      if ((Number(value[i]) && value[i] !== '+' && value[i] !== '-' && value[i] !== '.') || value[i] === '0') {
        trimmedText += value[i]
      }
    }
    if (start <= prefix.length) {
      target.setRangeText(prefix, 0, prefix.length, 'end')
      start = prefix.length
    }
    if (text?.length) {
      target.setRangeText(trimmedText, start, start + text.length, 'end')
      updateNumber(target)
    } else {
      target.setRangeText(trimmedText, start, start, 'end')
      updateNumber(target)
    }
    getRawNumber(target.value)
    e.preventDefault()
  }

  const oncut = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const start = e.currentTarget.selectionStart
    const end = e.currentTarget.selectionEnd
    const value = e.currentTarget.value
    if (start && end) {
      const copiedText = e.currentTarget.value.slice(start, end)
      navigator.clipboard.writeText(copiedText)
      const newValue = value.substring(0, start) + value.substring(end, value.length)
      e.currentTarget.value = newValue
      e.currentTarget.selectionStart = start
      e.currentTarget.selectionEnd = start
    }
    updateNumber(e.currentTarget)
    getRawNumber(e.currentTarget.value)
    e.preventDefault()
  }

  const onclick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { justSymbols } = getSeperatorsPositions(format.format)
    const { prefix } = getSeperatorsPositions(format.format)
    if (
      prefix &&
      (e.currentTarget.selectionStart || e.currentTarget.selectionStart === 0) &&
      e.currentTarget.selectionStart < prefix.length
    ) {
      if (e.currentTarget.value[prefix.length - 1] === '(') {
        e.currentTarget.selectionStart = prefix.length - 1
      } else {
        e.currentTarget.selectionStart = prefix.length
      }
    } else if (
      prefix &&
      e.currentTarget.selectionEnd &&
      justSymbols.includes(e.currentTarget.value[e.currentTarget.selectionEnd - 1]) &&
      e.currentTarget.selectionEnd > prefix.length
    )
      e.currentTarget.selectionEnd = e.currentTarget.selectionEnd - 1
  }

  const updateNumber = (target: HTMLInputElement) => {
    const { prefix } = getSeperatorsPositions(format.format)
    const getStart = target.selectionStart
    const getEnd = target.selectionEnd
    target.value = arrangeNumber(target.value)
    if (target.value.length === prefix.length) {
      target.selectionEnd = prefix.length
      target.selectionStart = prefix.length
    } else {
      if (getEnd && getStart) {
        target.selectionEnd = getEnd
        target.selectionStart = getStart
      }
    }
  }

  const inputValue = (value: string | number) => {
    let text = String(value)
    if (props.includeDialingCode === undefined || props.includeDialingCode) {
      if (props.format) {
        const pre = countryCode.slice(1, countryCode.length)
        if (text.startsWith(pre)) {
          text = value.toString().slice(countryCode.length - 1, text.length)
          return arrangeNumber(text)
        }
      }
      for (let i = 0; i < newCountries.length; i++) {
        const pre = newCountries[i].d.slice(1, newCountries[i].d.length)
        if (text.startsWith(pre)) {
          text = value.toString().slice(newCountries[i].d.length - 1, text.length)
          return arrangeNumber(text)
        }
      }
    }
    return arrangeNumber(text)
  }

  const inputStyle = props.format
    ? { borderRadius: '4px', margin: '0.375rem 0.2rem' }
    : { borderRadius: '0px 4px 4px 0px' }

  return (
    <>
      <div className={'flex flex-row h-full'} ref={(ref: HTMLDivElement) => (parent.current = ref)}>
        <Label htmlFor="phone" className="text-muted-foreground">

          {!props.format && (
            <CountrySelector
              disabled={props.disabled}
              fullIsoCode={props.fullIsoCode}
              searchOption={props.searchOption}
              defaultCountry={defaultCountry}
              onlyCountries={props.onlyCountries}
              setCountryCode={(code: string) => setCountryCode(code)}
              setFormat={(value: IFormat) => setFormat(value)}
              flags={props.flags}
              input={parent.current}
              mainInput={inputElm.current}
              drpButton={(btn: any) => (drpButton.current = btn)}
              list={(l: HTMLDivElement) => (list.current = l)}
            />
          )}
        </Label>
        <Input
          ref={(ref: HTMLInputElement) => (inputElm.current = ref)}
          disabled={props.disabled}
          type='tel'
          autoComplete='off'
          className="bg-background mt-2"
          placeholder={format.placeholder}
          style={inputStyle}
          value={inputValue(props.value as string)}
          onKeyDown={(e) => ondown(e.key, e)}
          onPaste={(e) => onpaste(e)}
          onChange={(e) => updateNumber(e.currentTarget)}
          onCut={(e) => oncut(e)}
          onClick={(e) => onclick(e)}
          name={props.name}
          onBlur={props.onBlur}
          {...props.register}
        />
      </div>
      {props.error && (
        <div style={{ textAlign: 'left', color: 'red', fontSize: 'small', marginTop: '5px' }}>
          <p>{props.error.length > 1 && props.error[0] && props.error[1]}</p>
        </div>
      )}
    </>
  )
}
