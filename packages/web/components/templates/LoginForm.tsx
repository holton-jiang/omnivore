import Link from 'next/link'
import { StyledText } from '../elements/StyledText'
import { VStack, Box, SpanBox } from '../elements/LayoutPrimitives'
import { styled } from '../tokens/stitches.config'
import {
  googleID,
  gauthRedirectURI,
  appleAuthRedirectURI,
} from '../../lib/appConfig'
import AppleLogin from 'react-apple-login'

const StyledTextSpan = styled('span', StyledText)

export type LoginFormProps = {
  errorMessage?: string
}

export function LoginForm(props: LoginFormProps): JSX.Element {
  const StyledTextHeadline = styled('h1', {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '50px',
    lineHeight: '100%',
    color: '$omnivoreGray',
    m: '0px',
  })

  return (
    <VStack
      alignment="start"
      distribution="center"
      css={{
        gap: '8px',
        maxWidth: '593px',
        '@mdDown': {
          maxWidth: '85%',
        },
      }}
    >
      <StyledTextHeadline>
        Never miss a great read.
      </StyledTextHeadline>
      <StyledText css={{ fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '18px',
        lineHeight: '120%',
        m: '0px',
        color: '$omnivoreGray',
      }}>
        Save articles and read them later in our distraction-free reader.
      </StyledText>
      <Link passHref href="/about">
        <a style={{ textDecoration: 'none' }}>
          <StyledText css={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '120%',
            m: '0px',
            color: '$omnivoreGray',
          }}>
            Learn More -&gt;
          </StyledText>
        </a>
      </Link>

      <SpanBox css={{ height: '24px' }} />

      <VStack alignment="start" distribution="center">
      {googleID && (
        <Box
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            height: '40px',
          }}
        >
          <GoogleAuthButton />
        </Box>
      )}

      <Box style={{ height: '16px' }}></Box>

      {appleAuthRedirectURI && (
        <Box
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            width: '210px',
            height: '40px',
          }}
        >
          <AppleLogin
            clientId="app.omnivore"
            scope="name email"
            state="web:login"
            redirectURI={appleAuthRedirectURI}
            responseMode="form_post"
            responseType="code id_token"
            designProp={{
              color: 'black',
              width: 261,
              height: 40,
              type: 'continue',
            }}
          />
        </Box>
      )}
{/* 
      <StyledText
        style="caption"
        css={{
          pt: '16px',
          maxWidth: '220px',
          textAlign: 'left',
          color: '$omnivoreLightGray',
        }}
      >
        <SpanBox>
          Use your email address to{' '}
          <Link href="/email-login" passHref>
            <StyledTextSpan style="captionLink" css={{ color: '$omnivoreGray' }}>
              Login
            </StyledTextSpan>
          </Link>{' '}
          or{' '}
          <Link href="/email-signup" passHref>
            <StyledTextSpan style="captionLink" css={{ color: '$omnivoreGray' }}>
              Signup
            </StyledTextSpan>
          </Link>{' '}
          with your email address.
        </SpanBox>
      </StyledText> */}

      </VStack>
      <TermAndConditionsFooter />
    </VStack>
  )
}

function GoogleAuthButton() {
  return (
    <Box css={{  overflow: 'hidden' }}>
      <div
        id="g_id_onload"
        data-client_id={googleID}
        data-context="use"
        data-ux_mode="popup"
        data-login_uri={gauthRedirectURI}
        data-auto_prompt="false"
        
      />

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="center"
        data-width="261"
      />
    </Box>
  )
}

export function TermAndConditionsFooter(): JSX.Element {
  return (
    <StyledText
      style="caption"
      css={{
        maxWidth: '220px',
        textAlign: 'left',
        color: '$omnivoreLightGray',
      }}
    >
      By signing up, you agree to Omnivore’s{' '}
      <Link href="/terms" passHref>
        <StyledTextSpan style="captionLink" css={{ color: '$omnivoreGray' }}>
          Terms of Service
        </StyledTextSpan>
      </Link>{' '}
      and{' '}
      <Link href="/privacy" passHref>
        <StyledTextSpan style="captionLink" css={{ color: '$omnivoreGray' }}>
          Privacy Policy
        </StyledTextSpan>
      </Link>
    </StyledText>
  )
}
