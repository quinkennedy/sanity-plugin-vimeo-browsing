import {EllipsisHorizontalIcon, LaunchIcon, ResetIcon, SearchIcon, VideoIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Menu, MenuButton, MenuItem, Stack, Text} from '@sanity/ui'
import {ReactElement, useCallback, useState} from 'react'
import {ObjectInputProps, unset} from 'sanity'

import {Config} from '../utils/types'
import VideoList from './VideoList'

export interface InputProps extends ObjectInputProps {
  config: Config
}

const Input = ({config, ...props}: InputProps): ReactElement => {
  const {onChange, value} = props

  const reset = useCallback(() => {
    onChange(unset())
  }, [])

  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])
  const autoPlay = props?.schemaType?.options?.autoplay === undefined || !!props?.schemaType?.options?.autoplay
  const controls = !!props?.schemaType?.options?.controls

  return (
    <>
      {value?.files ? (
        <Stack>
          <Card>
            <Box style={{paddingTop: '0.25rem', position: 'relative'}}>
              <video
                style={{
                  aspectRatio: '16 / 9',
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'var(--card-skeleton-color-to)',
                }}
                autoPlay={autoPlay}
                controls={controls}
                playsInline
                muted
                loop
                src={value.files?.[0]?.fileUrl}
                poster={value.thumbnail}
                width={value.width}
                height={value.height}
              />
              <MenuButton
                popover={{animate: true}}
                id={'menu'}
                button={
                  <Button
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '8px',
                    }}
                    padding={2}
                    mode={'ghost'}
                    icon={<EllipsisHorizontalIcon />}
                  />
                }
                menu={
                  <Menu>
                    <MenuItem onClick={onOpen} icon={<SearchIcon />} text={'Select'} />
                    <hr
                      style={{
                        height: '1px',
                        border: 0,
                        background: 'var(--card-hairline-soft-color)',
                        margin: 0,
                      }}
                    />
                    <MenuItem
                      onClick={() => {
                        window.open(`https://vimeo.com${value.manageLink}`, '_blank')
                      }}
                      icon={<LaunchIcon />}
                      text={'Open in Vimeo'}
                    />
                    <hr
                      style={{
                        height: '1px',
                        border: 0,
                        background: 'var(--card-hairline-soft-color)',
                        margin: 0,
                      }}
                    />
                    <MenuItem
                      tone={'critical'}
                      onClick={reset}
                      icon={<ResetIcon />}
                      text={'Clear Field'}
                    />
                  </Menu>
                }
              />
            </Box>
          </Card>
        </Stack>
      ) : (
        <Card paddingX={3} paddingY={2} radius={2} shadow={1}>
          <Flex justify={'space-between'} align={'center'}>
            <Flex muted gap={1} align={'center'}>
              <VideoIcon style={{color: 'var(--card-muted-fg-color)', fontSize: 20}} />
              <Text muted size={1}>
                Select your video from Vimeo
              </Text>
            </Flex>
            <Button
              onClick={onOpen}
              space={2}
              padding={2}
              text={'Select'}
              icon={<SearchIcon />}
              mode={'bleed'}
            />
          </Flex>
        </Card>
      )}
      {open && <VideoList config={config} value={value} onClose={onClose} onChange={onChange} />}
    </>
  )
}

export default Input
