import React from 'react';
import { GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { pick } from 'lodash';
import {
  convertMegabyteToGigabyte,
  FxButton,
  FxCard,
  FxCardProps,
} from '@functionland/component-library';

import { DApp } from './../../../../api/connectedDApps';
import DAppHeader from './DAppHeader';

type RowDetailsProps = {
  data: Pick<DApp, 'storageUsed' | 'lastUpdate' | 'name'>;
};

type CardDetailsProps = Pick<RowDetailsProps, 'data'> & {
  data: Pick<DApp, 'name'>;
  onPress: (event: GestureResponderEvent) => void;
};

type DAppCardProps = {
  data: DApp;
  isDetailed?: boolean;
  imageSrc: ImageSourcePropType;
} & FxCardProps;

export const RowDetails = ({ data }: RowDetailsProps) => {
  return (
    <>
      <FxCard.Row marginTop="24">
        <FxCard.Row.Title>Current use</FxCard.Row.Title>
        <FxCard.Row.Data>
          {convertMegabyteToGigabyte(data.storageUsed)} GB
        </FxCard.Row.Data>
      </FxCard.Row>
      <FxCard.Row>
        <FxCard.Row.Title>Last update</FxCard.Row.Title>
        <FxCard.Row.Data>{data.lastUpdate.toDateString()}</FxCard.Row.Data>
      </FxCard.Row>
    </>
  );
};

const CardDetails = ({ data, onPress }: CardDetailsProps) => {
  return (
    <>
      <RowDetails data={data} />
      <FxButton
        marginTop="20"
        onPress={onPress}
      >{`${data.name} settings`}</FxButton>
    </>
  );
};

const DAppCard = ({
  data,
  isDetailed,
  imageSrc,
  onPress,
  ...props
}: DAppCardProps) => {
  return (
    <FxCard marginTop="16" {...props}>
      <DAppHeader imageSrc={imageSrc} name={data.name} tag={data.tag} />
      {isDetailed && (
        <CardDetails
          onPress={onPress}
          data={pick(data, ['storageUsed', 'lastUpdate', 'name'])}
        />
      )}
    </FxCard>
  );
};

export default DAppCard;