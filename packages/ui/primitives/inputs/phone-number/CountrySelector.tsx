import { useEffect, useRef, useState } from 'react'
import { c } from './countries'
import React from 'react'
import Arrow from './Arrow'
import { ICountryList, ISelector } from '../../../lib/types'
import { Button } from '../../button'
import { Input } from '../../input'

export const CountrySelector: React.FC<ISelector> = (props: ISelector) => {
  const selector = useRef<HTMLDivElement>()
  const [imgErr, setImgErr] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string>()
  const activeOption = useRef<number | undefined>()
  const shouldShowDrpDwn = useRef<boolean>(true)
  const drpBtn = useRef<HTMLButtonElement>()
  const selectorInput = useRef<HTMLInputElement>()
  const [search, setSearch] = useState('')
  const noOptions = useRef(false)
  const [clickedOutside, setClickedOutside] = useState(true)
  const [isButtonActive, setIsButtonActive] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setSelectedOption(
        props.flags === undefined || props.flags
          ? props.defaultCountry.fg
          : props.fullIsoCode
          ? props.defaultCountry.c
          : props.defaultCountry.c_sm,
      )
      setImgErr(false)
    }
    img.onerror = () => {
      setSelectedOption(props.fullIsoCode ? props.defaultCountry.c : props.defaultCountry.c_sm)
      setImgErr(true)
    }
    img.src = c[0].fg
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (selector.current && props.input && drpBtn.current) {
       setClickedOutside(true)
        setIsButtonActive(false)
      // onClickOutside(selector.current, props.input, drpBtn.current, () => {
      //   setClickedOutside(true)
      //   setIsButtonActive(false)
      // })

      props.drpButton(drpBtn.current)
      props.list(selector.current)
    }
  }, [props])

  const getSelector = () => {
    setClickedOutside(false)
    setIsButtonActive(true)
    if (drpBtn.current) {
      const offset = drpBtn.current.getBoundingClientRect()
      if (offset.bottom > 500) {
        selector.current && shouldShowDrpDwn.current && selector.current.classList.add('show')
      } else {
        selector.current && shouldShowDrpDwn.current && selector.current.classList.remove('show')
      }
    }
    selector.current && shouldShowDrpDwn.current && selector.current.classList.toggle('hidden')
    props.input.classList.add(':focus')
  }
  const menuStyle = props.onlyCountries
    ? props.onlyCountries.length < 5
      ? {
          height: 'auto',
        }
      : {}
    : {}

  const selectOption = (country: ICountryList, index: number) => {
    setClickedOutside(true)
    changeCountry(country['f'], country['d'], country['p'])
    setSelectedOption(
      (props.flags === undefined || props.flags) && !imgErr
        ? country['fg']
        : props.fullIsoCode
        ? country['c']
        : country['c_sm'],
    )
    activeOption.current = index
    selector.current && shouldShowDrpDwn.current && selector.current.classList.remove('.show')
  }

  const countrySelectorStyle = { borderRadius: '4px 0px 0px 4px' }

  const changeCountry = async (format: string, code: string, placeholder: string) => {
    props.setFormat({
      format,
      placeholder,
    })
    props.mainInput?.focus()
    props.setCountryCode(code)
  }

  const countryOptions = (ar: ICountryList[]): ICountryList[] => {
    const options = props.onlyCountries
      ? ar.filter((country: ICountryList) => {
          const name = country['n'].toLocaleLowerCase()
          if (search) {
            return (
              (props.onlyCountries?.includes(country['c']) || props.onlyCountries?.includes(country['c_sm'])) &&
              name.startsWith(search)
            )
          } else {
            return props.onlyCountries?.includes(country['c']) || props.onlyCountries?.includes(country['c_sm'])
          }
        })
      : ar.filter((country: ICountryList) => {
          const name = country['n'].toLocaleLowerCase()
          if (search) {
            return name.startsWith(search)
          } else {
            return country
          }
        })
    shouldShowDrpDwn.current = (options.length && options.length > 1) || search ? true : false
    if (!shouldShowDrpDwn.current || props.disabled) {
      drpBtn.current && drpBtn.current.classList.add('show')
    }
    noOptions.current = options.length ? false : true
    return options
  }

  return (
    <div className={''}>
      <Button
        disabled={props.disabled}
        type="button"
        className="dark:bg-muted dark:hover:bg-muted/80 flex-1  bg-black/5 hover:bg-black/10"
        variant="secondary"
        ref={(ref: HTMLButtonElement) => (drpBtn.current = ref)}
        style={countrySelectorStyle}
        onMouseOver={() => setClickedOutside(false)}
        onMouseOut={() => !isButtonActive && setClickedOutside(true)}
        onClick={getSelector}
      >
        <div className={'flex flex-row w-full items-center justify-between'}>
          {(props.flags === undefined || props.flags) && !imgErr ? (
            <img src={selectedOption} className={'react_number_formatter_flag'} alt={selectedOption} />
          ) : (
            <span>{selectedOption}</span>
          )}
          {(props.onlyCountries &&
            props.onlyCountries.length < 2 &&
            (props.onlyCountries[0] === props.defaultCountry.c_sm ||
              props.onlyCountries[0] === props.defaultCountry.c)) ||
          props.disabled ? (
            ''
          ) : (
            <div className={'react_number_formatter_arrow_parent'}>
              <Arrow color={clickedOutside ? 'rgb(108, 108, 108)' : 'rgb(0, 145, 255)'} />
            </div>
          )}
        </div>
      </Button>
      <div style={menuStyle} ref={(ref: HTMLDivElement) => (selector.current = ref)} className={''}>
        {(props.searchOption === undefined || props.searchOption) && (
          <div >
            <Input
              type='search'
              placeholder='Search...'
              ref={(ref: HTMLInputElement) => (selectorInput.current = ref)}

              className="bg-background mt-2"
              onClick={() => {
                drpBtn.current && drpBtn.current.classList.add('show')
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.currentTarget.value.toLocaleLowerCase())
              }}
            />
          </div>
        )}
        <div className={``}>
          <div className={`flex flex-col px-4 gap-y-1`}>
            {countryOptions(c).map((country: ICountryList, index: number) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    selectOption(country, index)
                  }}
                  size={"sm"}
                  onTouchEnd={() => {
                    drpBtn.current && drpBtn.current.classList.add('hidden')
                  }}
                  className={'react_number_formatter_dropdown_content_child '}
                >
                  {(props.flags === undefined || props.flags) && !imgErr ? (
                    <img src={country['fg']} alt='' className={'react_number_formatter_selected_flag'} />
                  ) : (
                    ''
                  )}{' '}
                  {country['n']} {country['d']}
                </Button>
              )
            })}
            {noOptions.current && <p className={'react_number_formatter_no_option'}>No options</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
