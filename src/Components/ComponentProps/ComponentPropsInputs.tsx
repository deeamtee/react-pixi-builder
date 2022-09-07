import React from 'react';
import { Switcher, Input, InputNumber, Button, FormField, Select, Groups } from 'vienna-ui';
import { Cancel } from 'vienna.icons';
import { Prop } from '../../Core/base/interfaces';

const PropInput: React.FC<any> = ({ value, label, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}</FormField.Label>
        <FormField.Content>
            <Input value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        </FormField.Content>
    </FormField>
}

const PropInputNumber: React.FC<any> = ({ value, label, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}:</FormField.Label>
        <FormField.Content>
            <InputNumber value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value))} />
        </FormField.Content>
    </FormField>
}

const Cheeckbox: React.FC<any> = ({ value, label, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}:</FormField.Label>
        <FormField.Content>
            <Switcher checked={value} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
        </FormField.Content>
    </FormField>
}

const Expression: React.FC<any> = ({ value, label, disabled, onExpression, onRemoveExpression }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}</FormField.Label>
        <FormField.Content>
            <Groups>
                <Button design={value && 'primary' || 'accent'} onClick={onExpression} disabled={disabled} >{value || 'Добавить обработчик'}</Button>
                {value && <Button design='critical' onClick={onRemoveExpression} disabled={disabled} ><Cancel /></Button>}
            </Groups>
        </FormField.Content>
    </FormField >
}

const InputJSON: React.FC<any> = ({ value, label, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}:</FormField.Label>
        <FormField.Content>
            <Input value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
        </FormField.Content>
    </FormField>
}

const ChildrenInput: React.FC<any> = ({ value, label, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}:</FormField.Label>
        <FormField.Content>
            <Groups design="vertical">
                <Input value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
            </Groups>
        </FormField.Content>
    </FormField>
}

const PropSelect: React.FC<any> = ({ value, label, options, disabled, onChange }) => {
    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{label}:</FormField.Label>
        <FormField.Content>
            <Select value={value} disabled={disabled} options={options} onSelect={(e, data) => onChange(data?.value)} />
        </FormField.Content>
    </FormField>
}

const takeInput = (data: Prop) => {

    if (data.builInValues) {
        return PropSelect;
    }

    switch (data.type) {
        case Boolean:
            return Cheeckbox;
        case Function:
            return Expression;
        case Number:
            return PropInputNumber;
        case String:
            return PropInput;
        case Object:
            return InputJSON;
        case React:
            return ChildrenInput;
        default:
            return Input;
    }
}

export const constructInput = (key: any, data: Prop, index: any, disabled: boolean, onChange: any, onExpression: any, onRemoveExpression: any) => {
    const ConcreteInput = takeInput(data);

    return <ConcreteInput
        key={`s_${key}_${index}`}
        value={data.value ?? ''}
        options={data.builInValues}
        label={key}
        disabled={disabled}
        onRemoveExpression={() => onRemoveExpression(index, key)}
        onExpression={() => onExpression(index, key)}
        onChange={(value: any) => onChange(index, key, data.type, value)}
    />
}